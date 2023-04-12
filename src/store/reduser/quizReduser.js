import { createSlice } from "@reduxjs/toolkit";


const quizSlise = createSlice({

name: 'quiz',
//isUserReadyToStartQuiz: false,
initialState: {
    answersList: [],
    questionsList: [],
    isShowResults: false,
    questionsDocId: '',
    currentQuestion: [],
    usersResultsList: [],
    correctAnswersCount: 0,
    currentUserReadiness: {},
    isUserReadyToStartQuiz: false,
    correctAnswersCountDocId: '',
},

reducers: {
  clearQuestionsStore:() => {

  },

  setAnswerListStore:() => {

  },

  setQuestionsListStore:() => {

  },

  clearUsersResultsStore:() => {

  },

  clearAnswersListStore:() => {

  },
  
  setShowResultsStore:() => {

  },
  setQuestionsDocIdStore:() => {

  }, 
  
  setCurrentQuestionStore:() => {

},
  clearCurrentQuestionStore:() => {

  },
  setCorrectAnswerDocIdStore:() => {

  }, 
  setCorrectAnswersCountStore:() => {

  },
  setUserResultsResponseStore:() => {

  },
  setCurrentUserReadinessStore:(state,action) => {
   state.currentUserReadiness = action.payload
  },
  clearCorrectAnswersCountStore:() => {

  },
  clearCurrentUserReadinessStore:() => {

  },
  setIsUserReadyToStartQuizStore:(state,action) => {

  },
  setQuizDataFromlocalStorageStore:() => {

  },

  userReadyReadinessStore:(state,action) => {
    state.isUserReadyToStartQuiz = action.payload
  }
}

})

export const {
clearQuestionsStore,
setAnswerListStore,
setQuestionsListStore,
clearUsersResultsStore,
clearAnswersListStore,
setShowResultsStore,
setQuestionsDocIdStore,  
setCurrentQuestionStore,
clearCurrentQuestionStore,
setCorrectAnswerDocIdStore, 
setCorrectAnswersCountStore,
setUserResultsResponseStore,
setCurrentUserReadinessStore,
clearCorrectAnswersCountStore,
clearCurrentUserReadinessStore,
setIsUserReadyToStartQuizStore,
setQuizDataFromlocalStorageStore,
userReadyReadinessStore



} = quizSlise.actions

export default quizSlise.reducer;