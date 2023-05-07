import { db,auth } from "./Firebase";
import { addDoc,collection, setDoc, getDocs,doc, deleteDoc, updateDoc} from "firebase/firestore"; 


export const addQuizUsersFirebase = async () => {
    const user = auth.currentUser;
    const userReadinessDocId = user.uid;
    const userIdQuiz = user.uid;
  
try {
      
    const docRefQuiz = doc(db,'quizResult',userIdQuiz);
        
        await setDoc(docRefQuiz,{
                    currentQuestion:0,
                    users:
                      {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        points:0,
                        status:'pending',
                        isStartGame:true
                       },
                      }  
                    )
  
      return { userIdQuiz: userIdQuiz, docQuizFairbase: userReadinessDocId };
     
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

         return ( userReadinessQuery.size >= 2);
        
     } catch (error) {
         console.error('error', error);
     }
    
};


export const deleteFromCollectionByDocIdRequest = async () => {
const user = auth.currentUser;
const userIdQuiz = user.uid;

   try{
   await deleteDoc(doc(db, 'quizResult', userIdQuiz));
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


 export const updateQuizAnswersFirebase = async () => {
  
  const user = auth.currentUser;
  const userIdQuiz = user.uid;  

  try {
        const docQuiz = doc(db,'quizResult',userIdQuiz);
        await updateDoc(docQuiz,{
                       
                        "users.status":'active', 
                      
                    });

        } catch (e) {
  console.error("Error adding document: ", e);
  throw new Error(e);
 }
 }


 export const updateQuizResultsFirebase = async (correctAnswersCount,answerResultCount) => {
      
  const user = auth.currentUser;
  const userIdQuiz = user.uid;  
    
  try {
      const docQuiz = doc(db,'quizResult',userIdQuiz);
      
      const data = {
                    currentQuestion:answerResultCount,
                    
                    users:
                      {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        points:correctAnswersCount,
                        status:'pending',
                        isStartGame:true
                         }
         
        }
          
        await updateDoc(docQuiz,data)
       
        } catch (e) {
  console.error("Error adding document: ", e);
  throw new Error(e);
 }
 }

 export const setQuizQuestionsFirebase = async (answerResultCount) => {
        
  let questionsDocId = ''
        const fireBaseRef = collection(db,'questionsQuiz');
        const query = await getDocs(fireBaseRef);
         query.forEach((doc) => {
         questionsDocId = doc.id;
        });
  const data = {
                  currentQuestion:answerResultCount,
                  questionsDocId:questionsDocId
                }      
       
        const updateFireBase = doc(db,'questionsQuiz',questionsDocId);
        await updateDoc(updateFireBase,data)         
       
}

