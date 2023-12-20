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

exports.singleApplication = (req,res)=>{
    
    
    userModel.getSingleUser(req.query.userRef)
    .then(data=>{
       
        res.render("user/singleApplication",{"user":data[0], "application":data[1]})
    })
}

exports.handleReject = (req,res)=>{
    
   userModel.deleteAgentApplication(req.body.userRef);
       
    res.redirect("/unverifiedAgents");

}

exports.handleAccept = (req,res)=>{
    console.log("ref is", req.body.userRef);
    
   userModel.updateFieldByRef(req.body.userRef);
       
    res.redirect("/unverifiedAgents");

}