import { eventChannel } from 'redux-saga';
import { db } from '../../firebase/Firebase';
import { setUsersMessagesStore } from '../../store/reduser/chatReduser';
import { query, collection,orderBy, onSnapshot } from 'firebase/firestore';
import { setQuestionsListStore,
         setResultQuestionFirebase,
        
} from '../../store/reduser/quizReduser';


export function chatMessagesEventChannel() { //создает канал, который подключается к Firebase Firestore и прослушивает изменения в коллекции messages, отсортированной по полю createdAt. Когда происходят изменения, используется метод onSnapshot, чтобы получить текущее состояние данных в коллекции и вызвать функцию setUsersMessagesStore из chatReduser, передавая ей список сообщений в качестве параметра.
  
  //eventChannel - это функция из пакета redux-saga, которая создает канал, через который можно получать сообщения из внешних источников. Этот канал имеет два метода: take и close. take позволяет получить новое сообщение, когда оно будет доступно, а close позволяет закрыть канал.

  const listener = eventChannel(emitter => {
  
      const messagesRef = query(collection(db, 'messages'), orderBy('createdAt'));

    const unsubscribe = onSnapshot(messagesRef, snapshot => {
    const messages = snapshot.docs.map(doc => doc.data());
    
    emitter(setUsersMessagesStore(messages));
    });

    return unsubscribe;
  });

 return listener;

}


export function questionsEventChannel() { 

  const questionsRef = query(collection(db, 'questions'));

  const formatDataToStore = (questionsArr) => {
    let preparedQuestions = [];
    preparedQuestions = Object.values(questionsArr[0]).map(question => question);
    return preparedQuestions
  }
  const listener = eventChannel(emitter => {
   
    const unsubscribe = onSnapshot(questionsRef, snapshot => {
      if (snapshot.docs.length > 0) {
    const questions = snapshot.docs.map(doc => doc.data());
    emitter(setQuestionsListStore(formatDataToStore(questions)));
      }
                  
  });

     return unsubscribe;
   });
  return listener;
}


export function usersResultsEventChannel() { 

  const listener = eventChannel(emitter => {

  const userResultRef = query(collection(db, 'quizResult'));
  const unsubscribeResult = onSnapshot(userResultRef, (querySnapshot) => {
   
      if (querySnapshot.docs.length > 0) {
      const results = querySnapshot.docs.map(doc => doc.data());
    
      emitter(setResultQuestionFirebase(results));
    }
    });
    
    return unsubscribeResult;
  });

 return listener; 
}


