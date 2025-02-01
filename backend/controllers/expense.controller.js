import { Expense } from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const userId = req.id //Current logged in user id
    if (!description || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false
      })
    }

    const expense = await Expense.create({
      description,
      amount,
      category,
      userId
    })

    return res.status(201).json({
      message: "Expense added.",
      expense,
      success: true
    })

  } catch (error) {
    console.log(error);
  }
}

export const getAllExpense = async (req, res) => {
  try {
    const userId = req.id // Loggedin user Id 
    const category = req.query.category;
    const done = req.query.done;

    const query = {
      userId // filter by userId
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: category, $options: 'i' };
    }

    if (done) {
      if (done.toLowerCase() === 'done') {
        query.done = true
      } else if (done.toLowerCase() === 'undone') {
        query.done = false // filter for the expenses marked as false or are pending
      }
    }

    const expense = await Expense.find(query);

    if (!expense || expense.length === 0) {
      return res.status(404).json({
        message: "No expense found.",
        success: false
      })
    }

    return res.status(201).json({
      expense,
      success: true
    })

  } catch (error) {
    console.error(error);
  }
}

export const markAsDoneOrUndone = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const done = req.body;
    const expense = await Expense.findByIdAndUpdate(expenseId, done, { new: true });

    if (!expenseId) {
      return res.status(401).json({
        message: "Expense not found.",
        success: false
      })
    }
    return res.status(200).json({
      message: `Expense markes as ${expense.done ? 'done' : 'undone'}.`,
      success: true

    })
  } catch (error) {
    console.error(error);
  }
}

export const removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    await Expense.findByIdAndDelete(expenseId);
    return res.status(200).json({
      message: "Expense removed successfully.",
      success: true
    })

  } catch (error) {
    console.error(error);
  }
}

export const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { description, amount, category } = req.body;
    const updateData = { description, amount, category };

    const expense = await Expense.findByIdAndUpdate(expenseId, updateData, { new: true })
    return res.status(200).json({
      message: "Expense updated successfully.",
      expense,
      success: true
    })

  } catch (error) {
    console.error(error);
  }
}