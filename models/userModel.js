const db = require("../config");
const { collection, getDocs, deleteDoc, updateDoc, doc } = require('firebase/firestore');

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

async function getAllApplications(){
    const applicationsCol = collection(db, 'agentApplication');
    const applicationSnapshot = await getDocs(applicationsCol);
    
    const applicationList = applicationSnapshot.docs.map(doc => doc.data())
    
    return applicationList
    
}

exports.getAllAgentApplications = async (req, res) => {
    
    return getAllApplications();
    
}



exports.getSingleUser = async (req, res) => {
    
    let arr = [0,0];
    const usersSingle = collection(db, 'users');
    const userSnapshotSingle = await getDocs(usersSingle);
    const userListSingle = userSnapshotSingle.docs
        .filter(doc => doc.exists() && (doc.data().uid === req)) // Check for document existence and is_Agent field
        .map(doc => doc.data());
        arr[0] = userListSingle[0];
        const applicationListSingle = getAllApplications();
        
        await applicationListSingle.then(res=>{
            arr[1] = res.filter((d)=>d.userRef == req)[0];
    })
    
    // Query the 'users' collection based on the provided userRef
    
    return arr;
};

exports.deleteAgentApplication = async (req, res) => {
    const applicationsColDelete = collection(db, 'agentApplication');
    const applicationsColDeleteusers = collection(db, 'users');
    const applicationSnapshotDelete = (await getDocs(applicationsColDelete)).docs;
    applicationSnapshotDelete.forEach(async ele=>{
        if (ele.data().userRef == req){
            await deleteDoc(ele.ref);
            const userDocRef = doc(applicationsColDeleteusers, req);
            const updateData = {
                accountStatus: 'reject',
                // Add more variables as needed
            };
            await updateDoc(userDocRef,updateData);
        }
        else{
            console.log(ele.data().userRef, req);
        }
    })
    
};

exports.updateFieldByRef=async(req,res)=>{
    const colName = collection(db, 'users');
    const docName = (await getDocs(colName)).docs;
    console.log()
    docName.forEach(async ele=>{
        if (ele.data().uid == req){
            const userDocRef = doc(colName,req);
            const updateData = {
                accountStatus: 'success',
                is_agent:true,
            };
            await updateDoc(userDocRef,updateData);
        }
        else{
            console.log(ele.data().userRef, req);
        }
    })
}




