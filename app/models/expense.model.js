const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    username: { type: String, unique: true },
    totalPaidAmount: Number,
    totalSpendAmount: { type: Number, default: 0 },
    finalStatus: { type: Number, default: 0 },
    expensesManagedByUser: [{
        payee: String,
        buddies: [{
            name: String,
            expense: Number
        }],
        totalBillAmount: { type: Number, default: 0 }
    }]
});

module.exports = mongoose.model('Expense', ExpenseSchema);