module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const verifyToken = require('../controllers/verify-token.controller.js')

    // Create a new User
    app.post('/register', users.register);

    // Login user
    app.post('/login', users.login);

    // Logout user
    app.get('/logout',users.logout);

    //Tokern verification
    app.get('/me',verifyToken,users.me);

    // Retrieve all Users
    app.get('/users', users.findAll);

    // Retrieve a single User with username
    app.get('/users/:username', users.findOne);

    // Update a User with username
    app.put('/users/:username', verifyToken ,users.update);

    // Delete a User with username
    app.delete('/users/:username', verifyToken,users.delete);

    

}