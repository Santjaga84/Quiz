import { combineReducers } from 'redux';
import userReducer from './userReducer';

 import chatSlice from './chatReduser';
 import quizReduser from './quizReduser';

const rootReducer = combineReducers({
    userState: userReducer,
    chatState: chatSlice,
    quizState: quizReduser,
    
});

export default rootReducer;
