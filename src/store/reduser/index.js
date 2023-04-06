import { combineReducers } from 'redux';
import userReducer from './userReducer';

 import chatSlice from './chatReduser';
// import quizReducer from './quizReducer';

const rootReducer = combineReducers({
    userState: userReducer,
    chatState: chatSlice,
    // quizState: quizReducer,
    
});

export default rootReducer;
