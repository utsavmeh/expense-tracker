const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema(
  {
    expenseTitle: {
      type: String,
      required: true,
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    createdAt:{
      type: Date,
      default: new Date(),
      required: true
    }
  },
)

const Expense = new mongoose.model('Expense', expenseSchema)

module.exports = Expense
