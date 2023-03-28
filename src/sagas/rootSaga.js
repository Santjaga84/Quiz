import { all, call } from 'redux-saga/effects';
// import chatSaga from './chatSaga/chatSaga';
// import quizManagerUserSaga from './quizSaga/quizManagerUserSaga';
// import firebaseAuthSagaWatcher from './firebaseSaga/firebaseAuthSaga';
// import localStorageManagerSaga from './localStorageManager/saga';
import { watchAuthSaga } from './firebaseSaga/firebaseAuthSaga';

const sagasList = [
  
    watchAuthSaga
];

export default function* watchRootSaga() {
    yield all(sagasList.map(saga => call(saga)));
};
