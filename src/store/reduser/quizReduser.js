import { createSlice } from "@reduxjs/toolkit";


const quizSlise = createSlice({

name: 'quiz',

initialState: {
    questionsList: {},
    isShowResults: false,
    questionsDocId: '',
    correctAnswersCount: 0,
    answerResultCount:0,
    currentUserReadiness: {},
    isUserReadyToStartQuiz: false,
    isStartQuiz:false,
    currentQuestionsList:{},
    correctAnswerList:{},
    isCorrectAnswer:'',
    isAnswerResultList:[],
    results:[],
    isFinishQuiz: false,
    isStartGame: false,
    countQuestionStore:0,
    
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

  setCountQuestionStore:(state,action) => {
   state.countQuestionStore = action.payload
  },

  setIsAnswerResultListStore:(state,action) => {
    const newAnswer = {
    isAnswerResultList: action.payload,
    }; 
   
    state.isAnswerResultList.push(newAnswer);  
    
    if (state.isAnswerResultList.length === 10) {
      state.isAnswerResultList = [];
    }
  },

  sendQuestionsAnswersFromFirebase:(state,action) => {
    
  },

  setResultQuestionFirebase:(state,action) => {
     
    state.results = action.payload;
  },

  setUpdateQuizResultsFirebase:(state,action) => {
    
  },

  setShowResults(state, action) {
    state.isShowResults = action.payload;
  },

  setIsFinishQuiz:(state,action) => {
    state.isFinishQuiz = action.payload
  },

  setIsStartGame:(state,action) => {
    state.isStartGame = action.payload
  },

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
setResultQuestionFirebase,
setUpdateQuizResultsFirebase,
setShowResults,
setIsFinishQuiz,
setIsStartGames,
setCountQuestionStore,
} = quizSlise.actions

export default quizSlise.reducer;