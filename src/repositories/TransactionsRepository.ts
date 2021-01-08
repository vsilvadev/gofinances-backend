import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find(); // Buscando todos os dados de transações

    // Criar um reduce com dois parâmetros: Acumulador que salva os dados a serem retornados e transaction que é o item mapeado no momento
    const { income, outcome } = transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        // Switch para capturar tipo da transação e adicionar no lugar correto
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.value);
            break;
          case 'outcome':
            accumulator.outcome += Number(transaction.value);
            break;
          default:
            break;
        }
        // Retornando dados aculados(income, outcome e total) dentro das variáveis iniciais income e outcome através do destructuring
        return accumulator;
      },
      // Parâmetro do reduce para setar valores inicias dentro do accumulator
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
