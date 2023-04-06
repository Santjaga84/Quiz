import { db } from "./Firebase";
import { addDoc,collection } from "firebase/firestore";  


export const sendMessageFirebase = async(message) => {
  
try {

  const messagesRef = collection(db, 'messages');
  await addDoc(messagesRef,message);
    console.log("Document written with message: ", message);

    
} catch (e) {
  console.error("Error adding document: ", e);
  throw new Error(e);
 }
}
   
