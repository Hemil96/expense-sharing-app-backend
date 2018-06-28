module.exports = (app) => {
    const expense = require('../controllers/expense.controller.js');

    // Create a new Expense
    app.post('/expenses', expense.create);

    // Retrieve all Expenses 
    // app.get('/expenses', expense.findAll);

    // // Retrive Expenses managed by user
    // app.get('/expenses/username', expense.findUserManagedExpresses); 
}