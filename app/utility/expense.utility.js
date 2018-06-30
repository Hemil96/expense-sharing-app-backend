const User = require('../models/user.model.js')

exports.checkUserExist = (username) => {
    return new Promise((resole, reject)=>{
      // Mongo Query
      User.find({username : username}).then(docs => {
        if (!docs.length){
            resole(username)
        }
        else {
            resole(false);
        }
        }).catch(err => {
            reject(err)
        });
    })
  }


exports.divideExpense = (data) => {
    buddiesArray = data.newExpense.buddies
    buddiesArray.forEach( obj => {

    }) 
}


