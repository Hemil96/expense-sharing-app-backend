const mongoose = require('mongoose');

// SubSchemas
const BuddySchema = mongoose.Schema({
    name: { type: String, required: true },
    expense: { type: Number, required: true }
},{ _id : false })

exports.newExpenseSchema = NewExpenseSchema = mongoose.Schema(
    {
        payee: { type: String, required: true },
        buddies: [BuddySchema],
        totalBillAmount: { type: String, required: true }
    },{ _id : false }
);


// Main Schema
ExpenseSchema = mongoose.Schema({
    userId : { type: String, required: true },
    expensesManagedByUser:{type: [NewExpenseSchema], required: true} 
});

module.exports = mongoose.model('Expense', ExpenseSchema);


