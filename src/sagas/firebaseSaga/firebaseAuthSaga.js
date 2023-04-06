import { takeEvery, select, call, put } from 'redux-saga/effects';
import { 
  signOutGoogle,
  signInGoogle,
  
} from '../../firebase/authorizationMethods';

import { 
  setAuthUserStore, 
  setAuthUserDatabaseIdStore,
  setDataToLocalStorage,
  signInWithGoogle,
  signOutWithGoogle,
  
  } from '../../store/reduser/userReducer';
import { deleteUserFromFirebase } from '../../firebase/Firebase';

export function* signIn() {

  const { userId, firebaseDocId } = yield call(signInGoogle);
  console.log("firebaseDocId",firebaseDocId);
  
  try {

    yield put(setAuthUserStore({userId}));
    yield put(setAuthUserDatabaseIdStore({firebaseDocId}));
    yield put(setDataToLocalStorage( { userId, firebaseDocId } ));
    
  } catch (error) {
    console.log('error', error);
  }
}

export function* signOut() {
  try {
    const firebaseDocId = yield select(state => state.userState.firebaseDocId);

    yield call(deleteUserFromFirebase,firebaseDocId);
    yield call(signOutGoogle);
    yield put(setAuthUserStore(''));
    yield put(setAuthUserDatabaseIdStore(''));
    
    //удаление данных из localStorage
    localStorage.removeItem('user')

  } catch (error) {
    console.error('error', error);
  }
}

export function* setDataToLocalStorageSuccess() {
  
 const data =  yield select(state => state.userState.data);
 localStorage.setItem('user', JSON.stringify(data));
      
    
}

export function* watchAuthSaga() {
  yield takeEvery(signInWithGoogle, signIn);
  yield takeEvery(signOutWithGoogle, signOut);
  yield takeEvery(setDataToLocalStorage,setDataToLocalStorageSuccess) 
}


