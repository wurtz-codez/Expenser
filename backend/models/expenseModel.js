import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  done: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
}, { timestamps: true })

export const Expense = mongoose.model("Expense", expenseSchema)

