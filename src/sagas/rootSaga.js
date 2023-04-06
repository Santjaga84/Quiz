import { all, call } from 'redux-saga/effects';
import { watchAuthSaga } from './firebaseSaga/firebaseAuthSaga';
import watchChatSaga from './chatSaga/chatSaga';


const sagasList = [
  
    watchAuthSaga,
    watchChatSaga
];

export default function* watchRootSaga() {
    yield all(sagasList.map(saga => call(saga)));
};
