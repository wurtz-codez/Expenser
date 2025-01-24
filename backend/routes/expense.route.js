import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { addExpense, getAllExpense, markAsDoneOrUndone, removeExpense, updateExpense } from '../controllers/expense.controller.js';

const router = express.Router(); 

router.route('/add').post(isAuthenticated, addExpense);
router.route('/getall').get(isAuthenticated, getAllExpense);
router.route('/remove/:id').delete(isAuthenticated, removeExpense);
router.route('/update/:id').put(isAuthenticated, updateExpense);
router.route('/:id/done').put(isAuthenticated, markAsDoneOrUndone);

export default router;