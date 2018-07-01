const Expense = require('../models/expense.model.js');
const User = require('../models/user.model.js');
const expenseUtility = require('../utility/expense.utility.js');

// Create and Save a new Expense
exports.create = (req, res) => {
    // Validate request
    if(!req.body) { // I make it req.body from req.body.content
        return res.status(400).send({
            message: "Expense data can not be empty"
        });
    }
    
    var buddies = [req.body.newExpense.payee] 
    req.body.newExpense.buddies.forEach(buddy => {
        buddies.push(buddy.name)
    });
    
    // Check the buddy is a app user or not!
    const promises = []
    const usersNotFound = []
    buddies.forEach((buddy) => {
        promises.push(expenseUtility.checkUserExist(buddy));
    })
    Promise.all(promises)
    .then((users)=>{
        users.forEach(user => {
            if(user){
                usersNotFound.push(user)
            }
        });

        if(usersNotFound.length > 0){
            return res.send({message: usersNotFound + " not found"})
        }
        else {
            // Create a expense
            console.log("else");
            const expense = new Expense({
                userId : req.userId,
                newExpense : req.body.newExpense,
                    });

            // Save expense in the database
            expense.save()
            .then(data => {
                // Calculate and divide the expenses
                expenseUtility.divideExpense(data);
                res.status(200).send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the expense."
                });
            });
        }
    }).catch((err) => {
        res.status(500).send(err)
    })
};

// Retrieve and return all Expenses from the database.
exports.findAll = (req, res) => {
    Expense.find()
    .then(expenses => {
        res.status(200).send(expenses);
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
    Expense.find({_id: req.userId})
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

    // Login user must be an author of the expense to edit 
    // Expense.findOne({_id: req.params.expenseId}, (err, doc) => {
    //     if (err) {
    //         console.log(err + "<<<<<<<<<<<<<<<<<<<<<");
    //         res.status(400).send(err);
    //     } else {
    //         if(!doc || doc.userId !== req.userId){
    //             res.status(401).send({message :"You are not authorized to do this."})
    //         }     
    //     }
    // })

    query = req.params.userId
    Expense.findOneAndUpdate(query, { $set: {newExpense: req.body.newExpense} },{new: true}, 
    (err, doc) => {
        if(err){
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(doc)
        }
    })
}