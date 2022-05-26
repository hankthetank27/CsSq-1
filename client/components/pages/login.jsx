import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = props => {

  let navigate = useNavigate();
  async function submit (event) {
    const res = await props.submitLogin(event);
    if (res.status === 200){
      navigate('../', {replace: true})
      props.loadUserPresets();
    }
  }

  return (
    <div className='appBody'>
      <div className='loginOuter'>
       <div className='incorrectCreds'>{props.incorrectLogin}</div>
        <div className='loginContainer'>
          <form className='loginForm'>
            <input id='loginUsernameField' className='textField' type='text' placeholder='Username' onChange={props.handleChange} autoComplete='off'/>
            <input id='loginPasswordField' className='textField' type='password' placeholder='Password' onChange={props.handleChange}/>
            <button onClick={submit}>Submit</button>
          </form>
        </div>
        <Link to='/register' className='loginPageRegister'>Don't have an account?</Link>
      </div>
    </div>
  )
}

export default Login;