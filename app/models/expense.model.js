const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    username: { type: String, unique: true },
    totalPaidAmount: Number,
    totalSpendAmount: Number,
    finalStatus: Number,
    
});

module.exports = mongoose.model('Expense', ExpenseSchema);