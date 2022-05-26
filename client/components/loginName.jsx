import React from 'react';

const LoginName = props => {
  return (
    <div className='loginName'>Welcome, {props.currentUser}!</div>
  )
}

export default LoginName;