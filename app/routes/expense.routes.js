module.exports = (app) => {
    const expense = require('../controllers/expense.controller.js');
    verifyToken = require('../controllers/verify-token.controller.js')

    // Create a new Expense
    app.post('/expenses', verifyToken, expense.create);

    // Get all expenses 
    app.get('/expenses', verifyToken, expense.findAll);

    // Get all Expenses with particular userId
    app.get('/expenses/user/:userId', verifyToken, expense.findForUser);

    // Get a expense with expenseId
    app.get('/expenses/:expenseId', verifyToken, expense.findOne);

    // Update a expense with expressId
    app.put('/expenses/:expenseId',verifyToken, expense.update)

}