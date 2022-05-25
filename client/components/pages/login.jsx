import React from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
  return (
    <div className='appBody'>
      <div className='loginOuter'>
        <div className='loginContainer'>
          <form className='loginForm'>
            <input id='loginUsernameField' className='textField' type='text' placeholder='Username'/>
            <input id='loginPasswordField' className='textField' type='password' placeholder='Password'/>
            <button>Submit</button>
          </form>
        </div>
        <Link to='/register' className='loginPageRegister'>Don't have an account?</Link>
      </div>
    </div>
  )
}

export default Login;