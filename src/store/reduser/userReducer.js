import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
     uid: '',
     firebaseDocId:'',
     
  },
  reducers: {

    signInWithGoogle: (state, action) => {
     state.signInWithGoogle = action.payload;
    },
    
    signOutWithGoogle: (state, action) => {
     state.signOutWithGoogle = action.payload;
    },
  
    setAuthUserStore: (state, action) => {
    state.uid = action.payload.uid;
    },
  
    
    setAuthUserDatabaseIdStore: (state, action) => {
      state.firebaseDocId = action.payload.firebaseDocId;
      
    },

    setDataToLocalStorage: (state, action) => {
     
      state.data = action.payload;
    },
    },
  
  
});

export const {
  getUserId,
  setUserId,
  setUserDocId,
  setAuthUserStore,
  setAuthUserDatabaseIdStore,
  setDataToLocalStorage,
  signInWithGoogle ,
  userId,
  signInSuccess,
  signOutWithGoogle,
  //setDocRef
} = authSlice.actions;

export default authSlice.reducer;

