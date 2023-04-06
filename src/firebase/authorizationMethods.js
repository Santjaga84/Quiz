import { useContext, createContext,useEffect,useState } from 'react';
import { auth } from './Firebase';
import { GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged } from 'firebase/auth';
import { setFirebaseSignInRequest } from './Firebase';


const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
const [user, setUser] = useState({});


useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
//        localStorage.setItem('user', JSON.stringify(currentUser)); // сохраняем данные пользователя в localStorage
        setUser(currentUser);
      } else {
  //      localStorage.removeItem('user'); 
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
 
  return (
    <AuthContext.Provider value={{ 
      user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

export const signInGoogle = async () => {
  
  try {
    const provider = new GoogleAuthProvider();
    const  signInData  = await signInWithPopup(auth, provider);
       const {user} = signInData;
       console.log(signInData);
    // записываем данные пользователя в Firestore
    const { firebaseDocId } = await setFirebaseSignInRequest(user);
   
   // localStorage.setItem('userId', user.uid);
   // localStorage.setItem('firebaseDocId', firebaseDocId);
   
    return { userId: user.uid, firebaseDocId:firebaseDocId, name: user.displayName,
                 photoURL: user.photoURL,};
  } catch (error) {
    console.error('Error signing in with Google: ', error);
    throw new Error(error);
  }
  
};

export const checkUserSignInGoogle = async () =>{
  try {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    const { firebaseDocId } =  setFirebaseSignInRequest(user);
  
    return { userId: user.uid, firebaseDocId:firebaseDocId};
  }})
  } catch (error) {
    console.error('Error signing in with Google: ', error);
    throw new Error(error);
  }
}

  
export const signOutGoogle = async() => {

signOut(auth)

};

