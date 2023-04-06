import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
     userId: '',
     firebaseDocId:'',
     name: '',
     photoURL: '',
     
     
  },
  reducers: {

    signInWithGoogle: (state, action) => {
     state.signInWithGoogle = action.payload;
    },
    
    signOutWithGoogle: (state, action) => {
     state.signOutWithGoogle = action.payload;
    },
  
    setAuthUserStore: (state, action) => {
      
    state.userId = action.payload.userId;
    },
  
    
    setAuthUserDatabaseIdStore: (state, action) => {
      state.firebaseDocId = action.payload.firebaseDocId;
      
    },

    setDataToLocalStorage: (state, action) => {
      state.data = action.payload;
    },
    //  hydrateFromLocalStorage: (state, action) => {
    //     const { userId, firebaseDocId } = action.payload;
    //   state.user = userId;
    //   state.firebaseDocId = firebaseDocId;
    // }
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
  hydrateFromLocalStorage
} = authSlice.actions;

export default authSlice.reducer;

