import { useState } from "react";
import { db,auth } from "./Firebase";
import { addDoc,collection, setDoc, query ,where, getDocs,doc, deleteDoc, updateDoc, arrayUnion} from "firebase/firestore"; 


export const addQuizUsersFirebase = async () => {
    const user = auth.currentUser;
    const userReadinessDocId = user.uid;
    const userIdQuiz = user.uid;
  
try {
        const docRefQuiz = collection(db,'quizResult');
        
         const query = await getDocs(docRefQuiz);
         if (query.size === 0) {
         const docRefQuizFairbase = await addDoc(docRefQuiz,{
          
                    users:
                      {
                      //   {
                      //   uid: user.uid,
                      //   displayName: user.displayName,
                      //   photoURL: user.photoURL,
                      //   points:0
                      // },
                      status:'pending',
                         },
                       
                        currentQustion: 0,
                       
                    })
        const docQuizFairbase = docRefQuizFairbase.id                  
        
        return { userIdQuiz: userIdQuiz, docQuizFairbase: docQuizFairbase };
        }
      const querySnapshot = await getDocs(collection(db, "quizResult"));
         querySnapshot.forEach((doc) => {
        
    });
        const docQuizFairbase = doc.id;          
         return { userIdQuiz: userIdQuiz, docQuizFairbase: docQuizFairbase };  
      } catch (e) {
  console.error("Error adding document: ", e);
  throw new Error(e);
 }
  
  }
   

export const checkIsUsersReadyToStartQuiz = async () => {
     const firebaseUsersRef = collection(db, "users"); 
     const firebaseUsersReadinessRef = collection(db, "quizResult");                              

    try {
         const userQuery = await getDocs(firebaseUsersRef);
         const userReadinessQuery = await getDocs(firebaseUsersReadinessRef);

         return ( userReadinessQuery.size > 0);
        
     } catch (error) {
         console.error('error', error);
     }
    
};


export const deleteFromCollectionByDocIdRequest = async ( docQuizFairbase ) => {

const querySnapshot = await getDocs(collection(db, "quizResult"));
querySnapshot.forEach((doc) => {
  
  docQuizFairbase = doc.id
});
   try{
   await deleteDoc(doc(db, 'quizResult', docQuizFairbase));
  }catch(e){
     console.error("Error adding document: ", e);
  }
};


export const sendAddQuestionsRequest = async (questions) => {
    
  let questionsDocId = ''
  const questionsObj = {};
  questions.forEach((item, index) => {
  questionsObj[`question${index + 1}`] = item;
});

    try {
        const fireBaseRef = collection(db,'questions');
        const query = await getDocs(fireBaseRef);
        if (query.size === 0) {
        const firebaseQuestions = await addDoc(fireBaseRef,questionsObj)
         
          questionsDocId = firebaseQuestions.id  
          return questionsDocId;         
         }
         
         const querySnapshot = await getDocs(collection(db, "questions"));
         querySnapshot.forEach((doc) => {
         questionsDocId = doc.id;
});
                
         return questionsDocId;  
         } catch (e) {
  console.error("Error adding document: ", e);
  throw new Error(e);
 }
}

 export const deleteQuestionsFromFirebase = async (questionsDocId) => {

  if (questionsDocId) {
  try{
   
   await deleteDoc(doc(db, "questions", questionsDocId));
  }catch(e){
     console.error("Error adding document: ", e);
   }
  }
   return;
 };


 export const updateQuizAnswersFirebase = async (docQuizFairbase) => {
  
  const user = auth.currentUser;
    
  const querySnapshot = await getDocs(collection(db, "quizResult"));
  querySnapshot.forEach((doc) => {
  
  
  docQuizFairbase = doc.id
});
  
  try {
        const docQuiz = doc(db,'quizResult',docQuizFairbase);
        await updateDoc(docQuiz,{
                        //quizId:docRefFire.id,
                        users:arrayUnion(
                          {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        points:0, 
                        status:'active', 
                      }),
                       
                       //currentQustion:0,
                    });
//         console.log(docRefFire.id);       
  //       return {  uid: user.uid, isUserReadyToStartQuiz:isUserReadyToStartQuiz };
        } catch (e) {
  console.error("Error adding document: ", e);
  throw new Error(e);
 }
 }

 export const updateQuizResultsFirebase = async (correctAnswersCount,answerResultsCount,docQuizFairbase) => {
      
  const user = auth.currentUser;

  const querySnapshot = await getDocs(collection(db, "quizResult"));
  querySnapshot.forEach((doc) => {
  
  docQuizFairbase = doc.id
});

console.log("correctAnswersCount",correctAnswersCount);

  
  try {
        const docQuiz = doc(db,'quizResult',docQuizFairbase);
        
        const data = {
          currentQustion: answerResultsCount,

          users:{
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            status:'active',
            correctAnswersCount: correctAnswersCount,
          }
          }
          

        await updateDoc(docQuiz,data)
         // {
                      
                     //  "status":'active',
                   //    "currentQustion": answerResultCount,
   //                    "users.points": 4,
                 //     });
//         console.log(docRefFire.id);       
  //       return {  uid: user.uid, isUserReadyToStartQuiz:isUserReadyToStartQuiz };
        } catch (e) {
  console.error("Error adding document: ", e);
  throw new Error(e);
 }
 }