import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";
import {
  IsNumber, Min, IsEnum, IsString, IsDate
} from 'class-validator';
  
@Entity()
export class Expense {
@PrimaryGeneratedColumn()
id!: number;

@Column('decimal')
@IsNumber()
@Min(0.01)
amount!: number;

@Column({
    type: 'enum',
    enum: ['Food', 'Transport', 'Bills', 'Shopping', 'Others']
})
@IsEnum(['Food', 'Transport', 'Bills', 'Shopping', 'Others'])
category!: 'Food' | 'Transport' | 'Bills' | 'Shopping' | 'Others';

@Column('text')
@IsString()
description!: string;

@Column('timestamp')
@IsDate()
date!: Date;

@ManyToOne(() => User, user => user.expenses)
user: any;
}