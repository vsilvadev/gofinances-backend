import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // Pegando repositório de transactions para utilizar
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    // Buscando se o id existe
    const transaction = await transactionsRepository.findOne(id);

    // Se não existir transção retorna erro
    if (!transaction) {
      throw new AppError('Não existe nenhuma transação com este ID');
    }

    // Removendo transação do banco de dados
    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
