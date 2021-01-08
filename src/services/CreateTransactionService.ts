import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    // Utilizar repositório do typeorm para realizar operações e o nosso custom
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    // Utilizar um Repositório padrão do TypeORM já que não iremos criar um
    const categoryRepository = getRepository(Category);

    // Pegar o saldo atual (total)
    const { total } = await transactionsRepository.getBalance();

    // Se não existir saldo para realizar a transação então devolve um erro através do AppError
    if (type === 'outcome' && value > total) {
      throw new AppError(
        'Você não possui saldo suficiente para realizar essa transação',
      );
    }
    // Checar se existe categoria
    let transactionCategory = await categoryRepository.findOne({
      where: { title: category }, // Checar se existe um registro onde o title é a categoria que passamos pra classe via rota
    });

    // Se não existir categoria criar uma
    if (!transactionCategory) {
      transactionCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(transactionCategory); // Salvar nova categoria no Model/Banco
    }

    // Instanciar model e criar transaction
    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    // Salvar no banco o objeto criado
    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
