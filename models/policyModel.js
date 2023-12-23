const { all } = require("../Routes/userRoutes");
const db = require("../config");
const { collection, getDocs, deleteDoc, updateDoc, doc } = require('firebase/firestore');


async function getAllPolicies(uid){

    const policiesCol = collection(db, 'users', uid, 'policies');
    const policiesSnapshot = await getDocs(policiesCol);
    const policyList = policiesSnapshot.docs
    return policyList;
    
}

async function getAllUsers() {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    // const userList = userSnapshot.docs
    //     .filter(doc => doc.exists() && (doc.data().is_agent === undefined || !doc.data().is_agent)) // Check for document existence and is_Agent field
    //     .map(doc => doc.data());
    const userList = userSnapshot.docs.map(doc=>doc.data())
    return userList;
}

exports.getAllUnverifiedPolicies = async (req,res)=>{
    let allPolicies = {};
    const allUsers = await getAllUsers();
    console.log(allUsers[0].ref)
    for (user of allUsers){
        const userPolicyDocs = (await getAllPolicies(user.uid));
        console.log("policyId got is",userPolicyDocs[0].data());
        const userPolicy = userPolicyDocs.filter(doc=>doc.data().policy_number == undefined).map(doc=>doc.data());
        allPolicies[user.uid] = userPolicy;
    }
    return allPolicies;
}

exports.updatePolicy = async(req,res)=>{

    // let userPolicyDocs = getAllPolicies();
    // for (let policy of userPolicyDocs){
    //     if (policy.parentId)
    // }
    
}