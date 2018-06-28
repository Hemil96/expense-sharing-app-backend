const Expense = require('../models/expense.model.js');

// Create and Save a new Expense
exports.create = (req, res) => {
    // Validate request
    if(!req.body) { // I make it req.body from req.body.content
        return res.status(400).send({
            message: "Expense data can not be empty"
        });
    }

    // Create a expense
    const expense = new Expense({
        username: req.body.username,
        expensesManagedByUser: [{
            payee: req.body.payee,
            buddies: req.body.buddies,
            totalBillAmount: req.body.totalBillAmount
        }]
    });

    // Save expense in the database
    expense.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the expense."
        });
    });
};