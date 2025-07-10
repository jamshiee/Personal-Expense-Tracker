import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Expense } from "../entities/Expense.js";
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",

    // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT || "5432"),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    url: process.env.DB_URL,
     ssl: {
    rejectUnauthorized: false, 
  },
    synchronize: true,
    logging: true,
    entities: [User, Expense],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});