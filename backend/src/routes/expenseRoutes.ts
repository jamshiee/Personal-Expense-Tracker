import express from 'express';
import { createExpenseController, deleteExpenseController, getExpensesController, getExpenseSummaryController, getUserController, updateExpenseController } from '../controllers/expenseController.js';
import { jwtAuth } from '../middlewares/auth.js';

const router = express.Router();
router.use(jwtAuth)


router.get('/getuser', getUserController);
router.get('/expenses',getExpensesController);
router.post('/expenses', createExpenseController);
router.put('/expenses/:id', updateExpenseController);
router.delete('/expenses/:id', deleteExpenseController);
router.get('/expenses/summary', getExpenseSummaryController);



export default router;