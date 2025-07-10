// import '../types/express/index.d.ts';
import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import cookieParser from 'cookie-parser';
import { AppDataSource } from './config/ormconfig.js';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: 'https://personal-expense-tracker-sage.vercel.app',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api', expenseRoutes)

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });

