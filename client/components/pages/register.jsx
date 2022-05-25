import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = props => {
  let navigate = useNavigate();
  async function submit (event) {
    const res = await props.submitRegister(event);
    if (res.status === 200){
      navigate('../', {replace: true})
      props.loadUserPresets();
    }
  }

  return (
    <div className='appBody'>
      <div className='loginOuter'>
        <div className='userExists'>{props.userExists}</div>
          <div className='loginContainer'>
            <form className='loginForm'>
              <input id='registerUsernameField' className='textField' type='text' placeholder='Username' onChange={props.handleChange}/>
              <input id='registerPasswordField' className='textField' type='password' placeholder='Password' onChange={props.handleChange}/>
              <button onClick={submit}>Create Account</button>
            </form>
          </div>
      </div>
    </div>
  )
}

export default Register;