module.exports = (app) => {
    const users = require('../controllers/expense.controller.js');

    // Create a new Expense
    app.post('/expenses', users.create);

    // Retrieve expenses with me
    app.get('/expenses', users.findAll);

}