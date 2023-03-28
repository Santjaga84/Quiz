import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './../../firebase/authorizationMethods';

const Protected = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to='/' />;
    
  }
//console.log(user);
  return children;
};

export default Protected;
