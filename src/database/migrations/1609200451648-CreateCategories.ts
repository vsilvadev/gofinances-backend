import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCategories1609200451648
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // rodar query para criar tabela
    await queryRunner.createTable(
      new Table({
        // nome da tabela e depois colunas
        name: 'categories',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // apagando tabela de transactions
    await queryRunner.dropTable('categories');
  }
}
