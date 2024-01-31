import React, { useState } from 'react';
import config from '../config.json'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

const endpoint=config.apiUrl+"/auth/signup"

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: ''
  });
  const [signIn, setSignin] = useState(false); 
  const [passwordError, setPasswordError] = useState('');
  const [error, setError]=useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };



  const validatePassword = () => {
    setPasswordError('')
    const { password } = formData;

    // Password requirements
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Check if all requirements are met
    if (password.length < minLength) {
      setPasswordError('Password must be at least 8 characters long.');
    } else if (!hasLetter) {
      setPasswordError('Password must contain at least one letter.');
    } else if (!hasNumber) {
      setPasswordError('Password must contain at least one number.');
    } else if (!hasSpecialChar) {
      setPasswordError('Password must contain at least one special character.');
    } else {
      setPasswordError('');
    }
  };

  const handleSignUp = async () => {
    setError('')
    setSignin(false)
    axios.post(endpoint, formData)
    .then((response) => {

      console.log("response....",response);
      localStorage.setItem('user', response.data.name);
       navigate('/application');
      
    })
    .catch((error) => {
      
      console.error('Authentication failed:',error.response.data.message);
      setError(error.response.data.message); 
      console.log("statsucode...",error.response.status)
      if((error.response.status)===409){
        setSignin(true)
        console.log("please signin")
      }
      
    });

  };

  const handleSignIn=()=>{
    navigate('/signin');
  }

  return (
    <div className="auth-container">
      <h2> EasyGen Sign Up</h2>
      <form className="auth-form">  
        <label>Email: </label>
        <input type="email" name="email" className="auth-input" onChange={handleInputChange} />
        <br />
        <label>Name: </label>
        <input type="text" name="name" className="auth-input" onChange={handleInputChange} />
        <br />
        <label>Password: </label>
        <input type="password" name="password" className="auth-input" onChange={handleInputChange} onBlur={validatePassword}/>
        {passwordError && <div className="error-message">{passwordError}</div>}
     
       
        <br />
        <button type="button" className="auth-button" onClick={handleSignUp}>
          Sign Up
        </button>
        <br />
        {error && <div className="error-message">{error}</div>}



        {signIn &&(
          <button type="button"  className="auth-button secondary-button" onClick={handleSignIn}>
            Sign In
          </button>
        )}
       
      </form>
    </div>
  );
};

export default SignUp;
