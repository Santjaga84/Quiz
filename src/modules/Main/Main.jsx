import React from 'react'
import { QuizWrapper } from './styledComponents.js';
import Quiz from './components/quiz/Quiz';
import Chat from './components/chat/Chat';
import { setDataToLocalStorage,setAuthUserDatabaseIdStore,setAuthUserStore } from '../../store/reduser/userReducer.js';
import { useStore } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsUserReadyToStartQuizStore } from '../../store/reduser/quizReduser.js';
const Main = () => {

const dispatch = useDispatch();

  const persistedUserData = localStorage.getItem("user");
if (persistedUserData) {
   const { userId } = JSON.parse(persistedUserData);
    dispatch(setAuthUserStore({ userId }));
     const { firebaseDocId } = JSON.parse(persistedUserData);
    dispatch(setAuthUserDatabaseIdStore({ firebaseDocId }));
    
  }
  
  return (
    <QuizWrapper>
      <Quiz/>
      <Chat/>
    </QuizWrapper>
  )
}

export default Main;