const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body) { // I make it req.body from req.body.content
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }

    // Create a User
    const user = new User({
        username: req.body.username,
        password : req.body.password || "defaultpass",
        email: req.body.email || 'default@email.com',
        photolink: req.body.photoLink || 'defalt photo link',
        expense : {
            paid: req.body.paid || 0, 
            totalSpendAmount: 0,
            status: req.body.expense.status
        }
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a username
exports.findOne = (req, res) => {
    User.findOne(req.params.username)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.username
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.username
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.username
        });
    });
};

// Update a user identified by the username in the request
exports.update = (req, res) => {
    body = req.body;
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    // Find user and update it with the request body
    query = {username: req.params.username};
    User.findOneAndUpdate(query, { $set: body }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.username
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.username
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.username
        });
    });
};

// Delete a user with the specified username in the request
exports.delete = (req, res) => {
    User.findOneAndRemove(req.params.username)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.username
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.username
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.username
        });
    });
};

