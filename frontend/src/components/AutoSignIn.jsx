import React from 'react';
import { Navigate } from 'react-router-dom';

const AutoSignIn = (props) => {
  if (!localStorage.getItem('token')) {
    return props.children;
  } else {
    return <Navigate to={props.redirectTo} replace />;
  }
}

export default AutoSignIn;
