import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Category from './Category';

// Sinalizando que toda essa classe é um parâmetro da entidade. Toda vez que o model for salvo ou modificado ele vai salvar dentro da tabela de transactions
@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid') // Usamos pro id que é gerado automaticamente e é a chave primária
  id: string;

  @Column() // Coluna normal (varchar)
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column('decimal') // Número decimal
  value: number;

  @ManyToOne(() => Category, category => category.transaction, { eager: true }) // Muitas transações para uma categoria. Função que retorna o model que vai ser usado quando a variável for chamada
  @JoinColumn({ name: 'category_id' }) // Informar qual é a coluna que vai identificar qual a Categoria dessa transação
  category: Category; // Essa é a categoria que vamos usar quando for criar a transaction

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
