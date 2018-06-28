module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/users', users.create);

    // Retrieve all Users
    app.get('/users', users.findAll);

    // Retrieve a single User with username
    app.get('/users/:username', users.findOne);

    // Update a User with username
    app.put('/users/:username', users.update);

    // Delete a User with username
    app.delete('/users/:username', users.delete);

}