import React from 'react';
import { Navigate } from 'react-router-dom';

const Authenticate = (props) => {
  if (localStorage.getItem('token')) {
    return props.children;
  } else {
    return <Navigate to={props.redirectTo} replace />;
  }
}

export default Authenticate;
