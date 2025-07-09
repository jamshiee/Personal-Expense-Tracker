import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "./Expense.js";
import { Length, IsEmail, IsString } from 'class-validator';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    @IsString()
    fullname!: string;

    @Column({ type: 'varchar', unique: true })
    @IsEmail()
    email!: string;

    @Column('varchar')
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters long.' })
    password!: string;

    @OneToMany(() => Expense, (expense) => expense.user)
    expenses!: Expense[];
}