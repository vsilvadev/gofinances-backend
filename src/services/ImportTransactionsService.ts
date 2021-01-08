// Método In vai servir pra checar se nossas categorias do csv existe no BD (de uma vez só)
import { getCustomRepository, getRepository, In } from 'typeorm';
// Lib para manipular arquivo csv
import csvParse from 'csv-parse';
// Ajudar a abrir e ler arquivos
import fs from 'fs';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface CSVTransction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    // Responsável por ler nossos arquivos
    const contactReadStream = fs.createReadStream(filePath);

    // Função que vai ter vários métodos de configurações
    const parsers = csvParse({
      delimiter: ',', // Arquivo separado por vírgula
      from_line: 2, // Entende que a primeira linha não vale (começa na linha 1 e não linha 0)
    });

    // Vai ir lendo as linhas conforme ela estiver disponível (pipe)
    const parseCSV = contactReadStream.pipe(parsers);

    // Salvar os dados mapeados nessas variáveis para enviar tudo pro BD de uma vez só
    const transactions: CSVTransction[] = [];
    const categories: string[] = [];

    // Nome do evento, cada linha vai desestrutrar os valores
    parseCSV.on('data', async line => {
      // Desestruturar variáveis e cada célula na linha usando map
      const [title, type, value, category] = line.map(
        (cell: string) => cell.trim(), // Trim serve para remover os espaços em branco
      );

      // Verificar se variáveis estão chegando corretamente
      // Se não estiver já retorna
      if (!title || !type || !value) return;

      categories.push(category);

      transactions.push({ title, type, value, category });
    });
    // Verifica se o Parse.csv emitiu um evento chamado end - Quando o evento end for emitido ele vai retornaar o que devia fazer
    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentCategories = await categoriesRepository.find({
      where: {
        // In verifica se uma das categorias que temos no array existe no BD
        title: In(categories),
      },
    });

    // MAP para pegar apenas o titulo de categorias existentes
    const existentCategoriesTitles = existentCategories.map(
      (category: Category) => category.title,
    );

    // Descobrir categorias que não existem e impedir categorias duplicadas nas do arquivo CSV
    const addCategoryTitles = categories
      .filter(category => !existentCategoriesTitles.includes(category))
      // Vai mapear tudo buscando um index que o valor seja igual (retira o duplicado)
      .filter((value, index, self) => self.indexOf(value) === index);

    // Inserir Categorias novas no banco de dados mapeando e enviando em objetos individuais
    const newCategories = categoriesRepository.create(
      addCategoryTitles.map(title => ({
        title,
      })),
    );

    await categoriesRepository.save(newCategories);

    // Pegar todas as categorias
    const finalCategories = [...newCategories, ...existentCategories];

    const createdTransactions = transactionsRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: finalCategories.find(
          category => category.title === transaction.category,
        ), // Vamos buscar no finalCategories uma category que possua o mesmo título do transaction
      })),
    );

    await transactionsRepository.save(createdTransactions);

    await fs.promises.unlink(filePath);

    return createdTransactions;
  }
}

export default ImportTransactionsService;
