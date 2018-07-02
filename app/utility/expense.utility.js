const User = require('../models/user.model.js')
const Expense = require('../models/expense.model.js')

exports.checkUserExist = (username) => {
    return new Promise((resole, reject)=>{
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
    //  Adding paid amount to payee acc
    payee = data.newExpense.payee;
    User.findOne({username: payee}).then(payeeProfile => {
        payeeProfile.totalPaidAmount += data.newExpense.totalBillAmount;
        payeeProfile.finalStatus = payeeProfile.totalPaidAmount - payeeProfile.totalSpendAmount
        payeeProfile.save()
    }).catch(err => {console.log(err); return res.send("Payee bot found")})

    // Adding expense to buddies accs
    buddiesArray = data.newExpense.buddies;
    numberOfBuddies = buddiesArray.length
    buddiesArray.forEach( obj => {
        User.findOne({username : obj.name}).then((userProfile => {
            if (data.newExpense.splitAuto) {
                userProfile.totalSpendAmount += data.newExpense.totalBillAmount / numberOfBuddies;
                userProfile.save()
            } else {
                userProfile.totalSpendAmount += obj.expense;  
                userProfile.save()
            }
            userProfile.finalStatus = userProfile.totalPaidAmount - userProfile.totalSpendAmount
        })
    ).catch(err => {console.log(err);
        })
    })
}


exports.updateHelperFunction = (expenseId, newExpenseBody) => {
    Expense.findById(expenseId).then( (err, oldExpenseBody) => {
        oldExpenseBody.buddies.forEach(buddy => {
            
        })
    }
    ).catch()  
}


exports.isAuthorOftheExpense = (expenseId, userId) => {
    return new Promise((resolve,reject) => {
        Expense.findOne({_id: expenseId}, (err, doc) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                if(!doc || doc.userId !== userId){
                    resolve(false)
                }
                else{ resolve(true)}
            }   
        })
    
    })
}

