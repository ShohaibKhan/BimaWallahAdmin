const policyModel = require("../models/policyModel");

exports.unverifiedpolicies = (req,res)=>{

    policyModel.getAllUnverifiedPolicies()
    .then(policies=>{
        console.log("length is",policies.length);
        res.render("policies/verifyPolicies",{"policies":policies});
    });
}