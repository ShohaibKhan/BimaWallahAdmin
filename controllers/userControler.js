const userModel = require("../models/userModel");


exports.getAllUsers = (req,res)=>{
    userModel.getAllUsers()
    .then(allUers=>{
        res.render("user/allUsers",{"usersJson":allUers})
    })
}

exports.getAllUnverfied = (req,res)=>{
    userModel.getAllAgentApplications()
    .then(applicationsJson=>{
        res.render("user/allUnverifiedAgents",{"applicationsJson":applicationsJson})
    })
}

exports.singleApplication = (req,res,userRef)=>{
    userModel.getSingleUser(userRef)
    .then(user=>{
        res.render("user/singleApplication",{"user":user})
    })
}