import { all,put,takeEvery,call,select,take,fork,delay } from "redux-saga/effects";
import { sendGetRequest } from "../../API/sendGetRequest";
import { questionsUrl } from "../../API/constants";    
import * as eventChannels from '../eventChannels/eventChannels';
import { addQuizUsersFirebase,
         deleteFromCollectionByDocIdRequest,
         checkIsUsersReadyToStartQuiz,
         sendAddQuestionsRequest,
         deleteQuestionsFromFirebase,
         //sendQuizQuestionsAnswersFirebase,
         updateQuizAnswersFirebase,
         updateQuizResultsFirebase
} from "../../firebase/quizFirebase";

import { userReadyReadinessStore,
         setCurrentUserReadinessStore,
         setQuestionsDocIdStore,
         setIsUserReadyToStartQuizStore,
         userStartGameStore,
         setCurrentQuestionStore,
         setStartQuiz,
         setQuestionStore,
         setCorrectAnswerStore,
         setIncorrectAnswerStore,
         sendQuestionsAnswersFromFirebase,
         setUpdateQuizResultsFirebase
         
        } from "../../store/reduser/quizReduser";
//import { delay } from "redux-saga/effects";
        

export function* setIsReadyForGameRequest(action) {
    
        const isUserReadyForGame = action.payload
           
     try {
        
        if (isUserReadyForGame) {

            yield call(checkIsUsersReadyToStartQuiz) 
             

            const { userIdQuiz, docQuizFairbase } = yield call(addQuizUsersFirebase);
            yield put(setCurrentUserReadinessStore({userIdQuiz,docQuizFairbase}));
            console.log('userQuery',docQuizFairbase); 
            yield put(userReadyReadinessStore(true));
            localStorage.setItem('quizData', JSON.stringify({
        data: {
            isUserReadyToStartQuiz: true,
            currentUserReadiness:{ userIdQuiz, docQuizFairbase }
        }}));
        yield call(initializeBeforeStartQuiz)

        const isStartQuiz = yield call(checkIsUsersReadyToStartQuiz);
            console.log("isUsersReadyToStartQuiz",isStartQuiz);
        //isUserReadyForGame && (yield call(initializeBeforeStartQuiz));

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
        //const { userIdQuiz, userReadinessDocId } = yield call(addQuizUsersFirebase);
        const data = yield call(sendGetRequest, questionsUrl)
        
        //весь массив данных
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


export function* startListener() {  //генераторная функция, которая прослушивает новые сообщения в чате, используя канал событий chatMessagesEventChannel, определенный в ../eventChannels/eventChannels.js. Она входит в бесконечный цикл, используя оператор while (true) и ожидает новых сообщений, поступающих на канал событий, используя эффект take. Когда новое сообщение приходит, она отправляет связанное с ним действие.
    const questionsChannel = eventChannels.questionsEventChannel();
    const resultChannel = eventChannels.usersResultsEventChannel();

    while (true) {
        const eventQuestionAction = yield take(questionsChannel);
        yield put(eventQuestionAction);

        const eventResultsAction = yield take(resultChannel)
        yield put(eventResultsAction)
    }
}



export function* startQuiz() {
    
    const questions = yield select(state => state.quizState.questionsList);
  
    const docQuizFairbase = yield select(state => state.quizState.currentUserReadiness.docQuizFairbase);
    console.log("docQuizFairbase",docQuizFairbase);
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


export function* sendCountAnswersFromFirebase(action){

    const answerResultsCount = yield select(state => state.quizState.answerResultCount)
    //const answerResultCount = action.payload
    const correctAnswersCount = action.payload

    //console.log("answers",answerResultCount);
    console.log("correctAnswersCount",correctAnswersCount,answerResultsCount);
    yield call(updateQuizResultsFirebase,correctAnswersCount,answerResultsCount)
} 



export default function* watchQuizUserSaga() {
    yield all([
        fork(startListener),
        takeEvery(setIsUserReadyToStartQuizStore.type, setIsReadyForGameRequest),
        takeEvery(setStartQuiz.type, startQuiz),     
        takeEvery(setUpdateQuizResultsFirebase.type, sendCountAnswersFromFirebase)
    ]);
};