module.exports = (app) => {
    const expense = require('../controllers/expense.controller.js');
    const middleware = require('../controllers/middleware.controller.js');
    const verifyToken = middleware.verifyToken;
    const isAdmin = middleware.isAdmin;

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