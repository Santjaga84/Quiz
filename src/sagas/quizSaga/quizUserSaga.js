import { sendAddUserReadinessRequest,deleteFromCollectionByDocIdRequest } from "../../firebase/quizFirebase";
import { all,put,takeEvery,call,select } from "redux-saga/effects";
import { setIsUserReadyToStartQuizStore } from "../../store/reduser/quizReduser";
import { userReadyReadinessStore,setCurrentUserReadinessStore } from "../../store/reduser/quizReduser";
    


export function* setIsReadyForGameRequest(action) {
    
        const isUserReadyForGame = action.payload
           
     try {
        
        if (isUserReadyForGame) {

            const { userIdQuiz, userReadinessDocId } = yield call(sendAddUserReadinessRequest);
            yield put(setCurrentUserReadinessStore({userIdQuiz,userReadinessDocId}));
            yield put(userReadyReadinessStore(true));
            localStorage.setItem('quizData', JSON.stringify({
        data: {
            isUserReadyToStartQuiz: true,
            currentUserReadiness:{ userIdQuiz, userReadinessDocId }
        }}));
        
       return;
    
       }else{
         
       yield call(clearAllCurrentUserReadinessData);
       }
     } catch (error) {
       console.log('error', error);
  }
   
}

export function* clearAllCurrentUserReadinessData() {
      
    const userReadinessDocId = yield select(state => state.quizState.currentUserReadiness.userReadinessDocId);
  
    yield call(deleteFromCollectionByDocIdRequest,userReadinessDocId) 
    yield put(userReadyReadinessStore(false));
    localStorage.setItem('quizData', JSON.stringify({
        data: {
            isUserReadyToStartQuiz: false,
            currentUserReadiness: {},
        }}));
   
}

export default function* watchQuizUserSaga() {
    yield all([
        
        takeEvery(setIsUserReadyToStartQuizStore.type, setIsReadyForGameRequest),
       

    ]);
};