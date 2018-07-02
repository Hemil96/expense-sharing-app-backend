module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const middleware = require('../controllers/middleware.controller.js');
    const verifyToken = middleware.verifyToken;
    const isAdmin = middleware.isAdmin;

    // Create a new User
    app.post('/register', users.register);

    // Login user
    app.post('/login', users.login);

    // Logout user
    app.get('/logout',users.logout);

    //Tokern verification
    app.get('/me',verifyToken,users.me);

    // Retrieve all Users
    app.get('/users',[verifyToken, isAdmin],users.findAll);

    // Retrieve a single User with username
    app.get('/users/:userId', verifyToken ,users.findOne);

    // Update a User with username
    app.put('/users/:userId', verifyToken ,users.update);

    // Delete a User with username
    app.delete('/users/:userId', [verifyToken, isAdmin],users.delete);

}