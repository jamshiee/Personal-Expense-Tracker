import { Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig.js";
import { User } from "../entities/User.js";
import bcrypt from "bcrypt";

export const registerController = async (req: Request, res: Response): Promise<void> => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
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
        const newUser = userRepo.create({ fullname, email, password: hashedPassword });
        await userRepo.save(newUser);

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

        // Here you would typically generate a JWT token and send it back
        res.status(200).json({ message: "Login successful", userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}