import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { collection,addDoc,doc,deleteDoc,setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjdHpkdfn9U2BUG3PI6pdG1YVqcmOnTR4",
  authDomain: "quiz-game-8ae7c.firebaseapp.com",
  projectId: "quiz-game-8ae7c",
  storageBucket: "quiz-game-8ae7c.appspot.com",
  messagingSenderId: "596851278339",
  appId: "1:596851278339:web:00c1a81df97a62be34c436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);




export const setFirebaseSignInRequest = async (user) => {
  const userId = auth.currentUser.uid;
  console.log("user",userId);
try {
     const docRef = doc(db, "users",userId)
     await setDoc(docRef, {
                 userId: user.uid,
                 name: user.displayName,
                 photoURL: user.photoURL,
                 authProvider: 'google',
                 email: user.email,
               //  docId:user.accessToken,
                
                 
                 
  });
   const firebaseDocId = docRef.id
   console.log("Document written with ID: ", docRef.id);
   console.log("Document written with docsId: ", firebaseDocId);
   //console.log("uid",user.uid);
  // console.log("docId",user.accessToken);
  
return { userId: user.uid,firebaseDocId:firebaseDocId, name: user.displayName,
                 photoURL: user.photoURL,};
  
} catch (e) {
  console.error("Error adding document: ", e);
  throw new Error(e);
 }
}


export const deleteUserFromFirebase = async (firebaseDocId) => {
  //const docId = user.accessToken
  if (!firebaseDocId) {
  console.error('Error: docId is undefined or null');
  return;
}
  try{
    //userIdInFirebase
    console.log(firebaseDocId);
   await deleteDoc(doc(db, "users", firebaseDocId));
  }catch(e){
     console.error("Error adding document: ", e);
  }
}

