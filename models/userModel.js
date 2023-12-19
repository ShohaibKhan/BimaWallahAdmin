const db = require("../config");
const { collection, getDocs, where, query, exists } = require('firebase/firestore');

exports.getAllUsers = async (req, res) => {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    // const userList = userSnapshot.docs
    //     .filter(doc => doc.exists() && (doc.data().is_agent === undefined || !doc.data().is_agent)) // Check for document existence and is_Agent field
    //     .map(doc => doc.data());
    const userList = userSnapshot.docs
        .map(doc => doc.data());
    return userList;
}

exports.getAllAgentApplications = async (req, res) => {
    const applicationsCol = collection(db, 'agentApplication');
    const applicationSnapshot = await getDocs(applicationsCol);
    // const userList = userSnapshot.docs
    //     .filter(doc => doc.exists() && (doc.data().is_agent === undefined || !doc.data().is_agent)) // Check for document existence and is_Agent field
    //     .map(doc => doc.data());
    const applicationList = applicationSnapshot.docs
        .map(doc => doc.data());
    return applicationList;
}

exports.getSingleUser = async (req, res, userRef) => {
    const users = collection(db, 'users');

    // Query the 'users' collection based on the provided userRef
    const query = query(users, where('uid', '==', userRef));
    const userSnapshot = await getDocs(query);
    console.log(userSnapshot);
    // Check if any document matches the query
    if (userSnapshot.empty) {
        return null; // No matching user found
    }

    // Extract and return the data of the first matching user
    const userData = userSnapshot.docs[0].data();
    return userData;
};
