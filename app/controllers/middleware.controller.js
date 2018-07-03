var jwt = require('jsonwebtoken');
var config = require('../../config/database.config.js');
const User = require('../models/user.model.js');


exports.verifyToken =  function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

exports.isAdmin = function isAdmin( req, res, next) {
  User.findById(req.userId)
  .then(doc => {
      console.log(doc);
      console.log(doc.username);
      if(doc.username === "admin"){
        next()
      } 
      else {
        res.status(401).send({message:"You are not authorized to do this"});
      }
  }).catch(err => res.status(400).send(err))
}
