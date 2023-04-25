import { createSlice } from "@reduxjs/toolkit";


const quizSlise = createSlice({

name: 'quiz',
//isUserReadyToStartQuiz: false,
initialState: {
    //answersList: [],
    questionsList: {},
    isShowResults: false,
    questionsDocId: '',
   // currentQuestion: [],
    //usersResultsList: [],
    correctAnswersCount: 0,
    answerResultCount:0,
    currentUserReadiness: {},
    isUserReadyToStartQuiz: false,
   // correctAnswersCountDocId: '',
    isStartQuiz:false,
    currentQuestionsList:{},
    correctAnswerList:{},
    //incorrectAnswerList:{},
    isCorrectAnswer:'',
    //newAnswerResultList: '',
    isAnswerResultList:[],
    results:{}
},

reducers: {

  setIsUserReadyToStartQuizStore:(state,action) => { },

  setCorrectAnswersCountStore:(state,action) => {
    state.correctAnswersCount = action.payload
  },

  setAnswersListStore:(state,action) => {
    state.isCorrectAnswer = action.payload
  },

  setQuestionsDocIdStore:(state,action) => {
    state.questionsDocId = action.payload
  }, 
  
  setQuestionsListStore:(state,action) => {
   state.questionsList = action.payload
  },

  setCurrentQuestionStore:(state,action) => {
   state.currentQuestionsList = action.payload
},
  
  setCurrentUserReadinessStore:(state,action) => {
   state.currentUserReadiness = action.payload
  },
  
 // setIsUserReadyToStartQuizStore:(state,action) => {},

  userReadyReadinessStore:(state,action) => {
    state.isUserReadyToStartQuiz = action.payload
  },

  userStartGameStore:(state,action) => {
    state.isStartQuiz = action.payload
  },

  setStartQuiz:(state,action) => {
    //
  },

  setQuestionStore:(state,action) => {
    state.currentQuestionsList = action.payload
  },

  setCorrectAnswerStore:(state,action) => {
   state.correctAnswerList = action.payload
  }, 

  setAnswersCountStore:(state,action) => {
   state.answerResultCount = action.payload
  },

  setIsAnswerResultListStore:(state,action) => {
      const newAnswer = {
        isAnswerResultList: action.payload,
        
        
      };
      state.isAnswerResultList.push(newAnswer);
   
  },

  sendQuestionsAnswersFromFirebase:(state,action) => {
    console.log("Проверка");  
  },

  getResultQuestionFirebase:(state,action) => {
    state.results = action.payload
  },

  setUpdateQuizResultsFirebase:(state,action) => {}


}

})

export const {
setIsUserReadyToStartQuizStore,
setCorrectAnswersCountStore,
setAnswersListStore,
setQuestionsDocIdStore, 
setQuestionsListStore,
setCurrentQuestionStore,
setCurrentUserReadinessStore,
userReadyReadinessStore,
userStartGameStore,
setStartQuiz,
setQuestionStore,
setCorrectAnswerStore,
setAnswersCountStore,
setIsAnswerResultListStore,
sendQuestionsAnswersFromFirebase,
getResultQuestionFirebase,
setUpdateQuizResultsFirebase

} = quizSlise.actions

export default quizSlise.reducer;