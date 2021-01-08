import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTransactions1609202899839
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // rodar query para criar tabela
    await queryRunner.createTable(
      new Table({
        // nome da tabela e depois colunas
        name: 'transactions',
        columns: [
          {
            name: 'id', // Nome da coluna
            type: 'uuid', // Tipo de dado
            isPrimary: true, // Indica primary key
            generationStrategy: 'uuid', // Gera o campo id automaticamente com o tipo definido (uuid)
            default: 'uuid_generate_v4()', // Função que vai gerar o uuid por default (padrão no postgres)
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 10, // valor com 10 digitos do lado esquerdo
            scale: 2, // casas decimais do lado direito
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    // Linkando category_id com a tabela categories
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionCategory', // nome da chave estrangeira
        columnNames: ['category_id'], // nome da coluna da tabela que vai receber chave estrangeira
        referencedColumnNames: ['id'], // nome da coluna em outra tabela que vamos linkar com chave estrangeira
        referencedTableName: 'categories', // nome da table que possui a nossa referencia
        onDelete: 'SET NULL', // se a coluna for deletada substitui os valores por nulos
        onUpdate: 'CASCADE', // Sempre que atualizar em uma tabela vai atualizar na outra
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // apagando a FK
    await queryRunner.dropForeignKey('transactions', 'TransactionCategory');

    // apagando tabela de transactions
    await queryRunner.dropTable('transactions');
  }
}
