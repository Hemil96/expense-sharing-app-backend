const Expense = require('../models/expense.model.js');
const User = require('../models/user.model.js')

// Create and Save a new Expense
exports.create = (req, res) => {
    // Validate request
    if(!req.body) { // I make it req.body from req.body.content
        return res.status(400).send({
            message: "Expense data can not be empty"
        });
    }
    
    var buddies = []
    req.body.newExpense.buddies.forEach(buddy => {
        buddies.push(buddy.name)
    });
    
    // Check the buddy is a app user or not!
    // buddies.forEach(buddy => {
    //     User.find({username : buddy}).then(docs => {
    //         if (!docs.length){
    //             return res.status(404).send({message: buddy + " not found"})
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while checking users exsistanse =."
    //         });
    //     });
    // });


    // Create a expense
    const expense = new Expense({
        userId : req.userId,
        expensesManagedByUser : [req.body.newExpense],
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

// Retrieve and return all Expenses from the database.
exports.findAll = (req, res) => {
    Expense.find()
    .then(expenses => {
        res.send(expenses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving expenses."
        });
    });
};

// Retrive expenses of particular user
exports.findForUser = (req, res) => {
    Expense.find({ userId: req.params.userId })
    .then(expenses => {
        res.send(expenses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving expenses for" + req.param.username
        });
    });
}

// GET /expenses/:expressId - Retrive an expense with expense id
exports.findOne = (req, res) => {
    Expense.find({_id: req.params.expenseId})
    .then(expense => {
        res.send(expense);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving expenses for" + req.param.username
        });
    });
}

exports.update = (req,res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Expense content can not be empty"
        });
    }
    body = req.body
    query = req.params.expenseId
    Expense.findOneAndUpdate(query, { $set : body },{new: true})
    .then(expense => {
        console.log(err);
        
        if(!expense) {
            return res.status(404).send({
                message: "Expense not found with expense id: " + req.params.expenseId
            });
        }
        res.send(expense);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Expense not found with expense id: " + req.params.expenseId
            });                
        }
        return res.status(500).send({
            message: "Error updating expense with id " + req.params.expenseId
        });
    });
}