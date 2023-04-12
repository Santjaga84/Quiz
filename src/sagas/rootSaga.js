import { all, call } from 'redux-saga/effects';
import { watchAuthSaga } from './firebaseSaga/firebaseAuthSaga';
import watchChatSaga from './chatSaga/chatSaga';
import watchQuizUserSaga from './quizSaga/quizUserSaga';

const sagasList = [
  
    watchAuthSaga,
    watchChatSaga,
    watchQuizUserSaga
];

export default function* watchRootSaga() {
    yield all(sagasList.map(saga => call(saga)));
};
