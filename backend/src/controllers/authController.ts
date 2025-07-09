import { Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig.js";
import { User } from "../entities/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { validate } from "class-validator";

export const registerController = async (req: Request, res: Response): Promise<void> => {
    const { fullname, email, password } = req.body;

    const user = new User();
    user.fullname = fullname;
    user.email = email;
    user.password = password;

    const errors = await validate(user);
    if (errors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors });
        return;
    }

    try {
        const userRepo = AppDataSource.getRepository(User);
        const existingUser = await userRepo.findOneBy({ email });

        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await userRepo.save(user);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }

    try {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ email });

        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

        res.status(200).json({ message: "Login successful", accesToken: token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}