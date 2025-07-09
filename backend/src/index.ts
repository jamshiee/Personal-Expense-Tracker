import '../types/express';
import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import { AppDataSource } from './config/ormconfig.js';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

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

