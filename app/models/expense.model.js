const mongoose = require('mongoose');

// SubSchemas
const BuddySchema = mongoose.Schema({
    name: { type: String, required: true },
    expense: { type: Number }
},{ _id : false })

exports.newExpenseSchema = NewExpenseSchema = mongoose.Schema(
    {
        payee: { type: String, required: true },
        buddies: [BuddySchema],
        totalBillAmount: { type: Number, required: true },
        splitAuto : { type: Boolean, required: true },
    },{ _id : false }
);


// Main Schema
ExpenseSchema = mongoose.Schema({
    userId : { type: String, required: true },
    newExpense :{type: NewExpenseSchema, required: true} 
},{ timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);


