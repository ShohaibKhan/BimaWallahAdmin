const db = require("../config");
const { collection, getDocs, deleteDoc, updateDoc, doc } = require('firebase/firestore');

exports.getAllPolicyTypes = async (req, res) => {
    const usersCol = collection(db, 'policyTypes');
    const userSnapshot = await getDocs(usersCol);
    // const userList = userSnapshot.docs
    //     .filter(doc => doc.exists() && (doc.data().is_agent === undefined || !doc.data().is_agent)) // Check for document existence and is_Agent field
    //     .map(doc => doc.data());
    const userList = userSnapshot.docs
    .map(doc => doc.data());
    return policyTypesList;
}
