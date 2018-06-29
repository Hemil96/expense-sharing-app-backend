const User = require('../models/user.model.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../config/database.config.js');

// Create and Save a new User
exports.register = (req, res) => {
    // Validate request
    if(!req.body) { // I make it req.body from req.body.content
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }
    var hashedPassword = bcrypt.hashSync(req.body.password, 8); // Generate hash for the password
    // Create a User
    const user = new User({
        username: req.body.username,
        password : hashedPassword,
        email: req.body.email || 'default@email.com',
        photolink: req.body.photoLink || 'defalt photo link',
        phoneNumber: req.body.phoneNumber,
        totalSpendAmount: 0,
        totalPaidAmount: 0,
        finalStatus: 0,
    });

    // Save User in the database
    user.save()
    .then(data => {
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token, data });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      });
}

exports.logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
}

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
    query = req.userId
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


exports.me = (req,res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        User.findById(decoded.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            
            res.status(200).send(user);
          });
    });
}