import React from 'react'
import { Routes, Route } from 'react-router';
import Login from '../Login/Login.jsx';
import Main from '../Main/Main.jsx';
import Game from '../Main/components/quiz/components/game/Game.jsx';
import { AuthContextProvider } from '../../firebase/authorizationMethods.js';
import Protected from './Protected.js';
import Navbar from '../navbar/Navbar';



const AppRouter = () => {
 

//const user = useSelector(state => state.userState.userId);

return (


<AuthContextProvider>
<Navbar/>
    <Routes>
         
         <Route path='/' element={<Login />} />
          
          <Route
            path='/main'
            element={
              <Protected>
                <Main />
              </Protected>
            }
          />
          <Route
            path='/game'
            element={
              <Protected>
                <Game />
              </Protected>
            }
          />
        </Routes>
        
</AuthContextProvider>
)
        }
export default AppRouter;


