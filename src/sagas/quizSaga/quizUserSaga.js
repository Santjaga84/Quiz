import { all,put,takeEvery,call,select,take,fork } from "redux-saga/effects";
import { sendGetRequest } from "../../API/sendGetRequest";
import { questionsUrl } from "../../API/constants";    
import * as eventChannels from '../eventChannels/eventChannels';
import { addQuizUsersFirebase,
         deleteFromCollectionByDocIdRequest,
         checkIsUsersReadyToStartQuiz,
         sendAddQuestionsRequest,
         deleteQuestionsFromFirebase,
         updateQuizAnswersFirebase,
         updateQuizResultsFirebase,
         setQuizQuestionsFirebase,
         
} from "../../firebase/quizFirebase";

import { userReadyReadinessStore,
         setCurrentUserReadinessStore,
         setQuestionsDocIdStore,
         setIsUserReadyToStartQuizStore,
         userStartGameStore,
         setStartQuiz,
         setQuestionStore,
         setCorrectAnswerStore,
         setUpdateQuizResultsFirebase
         
        } from "../../store/reduser/quizReduser";
        

export function* setIsReadyForGameRequest(action) {
    
        const isUserReadyForGame = action.payload
           
     try {
        
        if (isUserReadyForGame) {

            yield call(checkIsUsersReadyToStartQuiz) 
            
            const { userIdQuiz, docQuizFairbase } = yield call(addQuizUsersFirebase);
            yield put(setCurrentUserReadinessStore({userIdQuiz,docQuizFairbase}));
            yield put(userReadyReadinessStore(true));
            localStorage.setItem('quizData', JSON.stringify({
        data: {
            isUserReadyToStartQuiz: true,
            currentUserReadiness:{ userIdQuiz, docQuizFairbase }
        }}));
        yield call(initializeBeforeStartQuiz)

        const isStartQuiz = yield call(checkIsUsersReadyToStartQuiz);
                
        yield put(userStartGameStore(isStartQuiz))

       return;
    
       }else{
         
       yield call(clearAllCurrentUserReadinessData);
       }
     } catch (error) {
       console.log('error', error);
  }
   
}

export function* initializeBeforeStartQuiz() {
    try {
        const data = yield call(sendGetRequest, questionsUrl)
                
        const {results:questions}  = data;
                   
    const questionsDocId = yield call(sendAddQuestionsRequest, questions);
     
    yield put(setQuestionsDocIdStore(questionsDocId));
      
    } catch (error) {
        console.error('error', error);
    }
}

export function* clearAllCurrentUserReadinessData() {
      
    const docQuizFairbase = yield select(state => state.quizState.currentUserReadiness.docQuizFairbase);
    const questionsDocId = yield select(state => state.quizState.questionsDocId)
    yield call(deleteFromCollectionByDocIdRequest,docQuizFairbase)
    yield call(deleteQuestionsFromFirebase,questionsDocId)
    yield put(userReadyReadinessStore(false));
    localStorage.setItem('quizData', JSON.stringify({
        data: {
            isUserReadyToStartQuiz: false,
            currentUserReadiness: {},
        }}));
    yield put(userStartGameStore(false))    
   
}


export function* startListenerQuestions() {  //генераторная функция, которая прослушивает новые сообщения в чате, используя канал событий chatMessagesEventChannel, определенный в ../eventChannels/eventChannels.js. Она входит в бесконечный цикл, используя оператор while (true) и ожидает новых сообщений, поступающих на канал событий, используя эффект take. Когда новое сообщение приходит, она отправляет связанное с ним действие.
    const questionsChannel = eventChannels.questionsEventChannel();
   
    while (true) {
        const eventQuestionAction = yield take(questionsChannel);
        yield put(eventQuestionAction);

    }
}

export function* startListenerResults() {
const resultChannel = eventChannels.usersResultsEventChannel();

    while (true) {
        
        const eventResultsAction = yield take(resultChannel)
        yield put(eventResultsAction)
       
    }
}


export function* startQuiz() {
    
    const questions = yield select(state => state.quizState.questionsList);
  
    const docQuizFairbase = yield select(state => state.quizState.currentUserReadiness.docQuizFairbase);
    const formattedQuestions = questions.map((questionObj) => {
    const answers = [...questionObj.incorrect_answers, questionObj.correct_answer];
    return {
    question: questionObj.question,
    answers: answers
  }
})
yield put(setQuestionStore(formattedQuestions)); 
   
const correctAnswer = questions.map((item) => item.correct_answer);
yield put(setCorrectAnswerStore(correctAnswer))
yield call(updateQuizAnswersFirebase,docQuizFairbase)

}


export function* setCountAnswersFromFirebase(action){

    const {answerResultCount,correctAnswersCount } = action.payload
          
    yield call(updateQuizResultsFirebase,correctAnswersCount,answerResultCount)
    yield call(setQuizQuestionsFirebase,answerResultCount)
} 



export default function* watchQuizUserSaga() {
    yield all([
        fork(startListenerQuestions),
        fork(startListenerResults),
        takeEvery(setIsUserReadyToStartQuizStore.type, setIsReadyForGameRequest),
        takeEvery(setStartQuiz.type, startQuiz),     
        takeEvery(setUpdateQuizResultsFirebase.type, setCountAnswersFromFirebase)
    ]);
};