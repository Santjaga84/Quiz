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
 
        setUser(currentUser);
      } else {
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
    const { user } = await signInWithPopup(auth, provider);
     
    // записываем данные пользователя в Firestore
    const { firebaseDocId } = await setFirebaseSignInRequest(user);
  
    return { uid: user.uid, firebaseDocId:firebaseDocId};
  } catch (error) {
    console.error('Error signing in with Google: ', error);
    throw new Error(error);
  }
  
};

  
export const signOutGoogle = async(id) => {

signOut(auth)

};

