import express from 'express';
import { AppDataSource } from '../config/ormconfig.js';
import { Expense } from '../entities/Expense.js';
import { validate } from 'class-validator';

const expenseRepo = AppDataSource.getRepository(Expense);


export const getExpensesController = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const expenses = await expenseRepo
            .createQueryBuilder('expense')
            .leftJoinAndSelect('expense.user', 'user')
            .where('user.id = :userId', { userId: user.id })
            .getMany();

        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const createExpenseController = async (req: express.Request, res: express.Response): Promise<void> => {
    const { description, amount, category } = req.body;


    try {
        const exp = expenseRepo.create({
            amount: amount,
            category: category,
            description: description,
            date: new Date(),
            user: req.user,
        });
        
        const errors = await validate(exp);
        if (errors.length) {
            res.status(400).json(errors);
            return;
        }

        await expenseRepo.save(exp);
        res.status(201).json(exp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateExpenseController = async (req: express.Request, res: express.Response): Promise<void> => {
    const { id } = req.params;
    const { description, amount, category } = req.body;

    try {
        const expense = await expenseRepo.findOneBy({ id: parseInt(id) });

        if (!expense) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }

        expense.description = description;
        expense.amount = amount;
        expense.date =  new Date();
        expense.category = category;

        await expenseRepo.save(expense);
        res.status(200).json({ message: "Expense updated successfully", expense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteExpenseController = async (req: express.Request, res: express.Response): Promise<void> => {
    const { id } = req.params;

    try {
        const expense = await expenseRepo.findOneBy({ id: parseInt(id) });

        if (!expense) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }

        await expenseRepo.remove(expense);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getExpenseSummaryController = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const expenses = await expenseRepo
            .createQueryBuilder('expense')
            .leftJoin('expense.user', 'user')
            .where('user.id = :userId', { userId: user.id })
            .getMany();

        const summary = expenses.reduce((acc: Record<string, number>, expense) => {
            if (!acc[expense.category]) {
                acc[expense.category] = 0;
            }
            acc[expense.category] += Number(expense.amount);
            return acc;
        }, {} as Record<string, number>);

        res.status(200).json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};