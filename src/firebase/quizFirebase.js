import { db,auth } from "./Firebase";
import { addDoc,collection, setDoc, query ,where, getDoc,doc, deleteDoc} from "firebase/firestore"; 


export const sendAddUserReadinessRequest = async () => {
    const user = auth.currentUser;
    const userReadinessDocId = user.uid;
    const userIdQuiz = user.uid;    
try {
        const docRefQuiz = doc(db,'usersReadiness',userReadinessDocId);
        await setDoc (docRefQuiz,{
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        
        });
                  
         return { userIdQuiz: userIdQuiz, userReadinessDocId: userReadinessDocId };
        } catch (e) {
  console.error("Error adding document: ", e);
  throw new Error(e);
 }
          
    
        }
   

export const checkIsUsersReadyToStartQuiz = async () => {
    const firebaseUsersRef = db.collection('users');
    const firebaseUsersReadinessRef = db.collection('usersReadiness');

    try {
        const userQuery = await firebaseUsersRef.getDocs();
        const userReadinessQuery = await firebaseUsersReadinessRef.getDocs();

        return (userQuery.docs.length && userQuery.docs.length === userReadinessQuery.docs.length);
    } catch (error) {
        console.error('error', error);
    }
};


export const deleteFromCollectionByDocIdRequest = async ( userReadinessDocId ) => {
   try{
    
   await deleteDoc(doc(db, 'usersReadiness', userReadinessDocId));
  }catch(e){
     console.error("Error adding document: ", e);
  }
};