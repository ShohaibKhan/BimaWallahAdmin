const policyTypeModel = require("../models/policyTypeModel");

exports.AllPolicyTypes = (req,res)=>{
    policyTypeModel.getAllPolicyTypes()
    .then(allPolicyTypes=>{
        res.render("policies/policyTypes",{"policytypeJson":allPolicyTypes})
    })
}