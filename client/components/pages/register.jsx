import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Register = props => {

  const { handleChange, pass } = props;

  const navigate = useNavigate();
  const [ registerError, setRegisterError] = useState('');

  async function submit (event) {
    setRegisterError('');
    if (pass.length < 6){
      return setRegisterError('Password must be at least 6 charaters');
    };

    const res = await props.submitRegister(event);

    if (res.status === 200){
      navigate('../', {replace: true});
      props.loadUserPresets();
    };

    if (res.status === 400){
      const resBody = await res.json();
      setRegisterError(resBody);
    };
  };

  return (
    <div className='appBody'>
      <div className='loginOuter'>
        <div className='registerError'>{registerError}</div>
          <div className='loginContainer'>
            <form className='loginForm'>
              <input id='registerUsernameField' className='textField' type='text' placeholder='Username' onChange={handleChange} autoComplete='off'/>
              <input id='registerPasswordField' className='textField' type='password' placeholder='Password' onChange={handleChange}/>
              <button onClick={submit}>Create Account</button>
            </form>
          </div>
      </div>
    </div>
  )
}

export default Register;