import React, { useState } from 'react';
import config from '../config.json'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

const endpoint=config.apiUrl+"/auth/signin"
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [signUp, setSignUp] = useState(false); 
  const [error, setError]=useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = () => {
    setSignUp(false)
    setError('')
    axios.post(endpoint, formData)
      .then((response) => {
     
        console.log('User authenticated successfully');
        localStorage.setItem('user', response.json().name);
        navigate('/application');
      })
      .catch((error) => {
        console.error('Authentication failed:',error.response.data.message);
        setError(error.response.data.message); 
        console.log("statsucode...",error.response.status)
        if((error.response.status)===404){
          setSignUp(true)
          console.log("please signup")
        }
       
       
      });
  };
  const handleSignUp=()=>{
    navigate('/signup');
  }
  return (
    <div className="auth-container">
    <h2> EasyGen Sign In</h2>
    <form className="auth-form">  
        <label>Email: </label>
        <input type="email" name="email" className="auth-input" onChange={handleInputChange} />
        <br />
        <label>Password: </label>
        <input type="password" name="password" className="auth-input"  onChange={handleInputChange} />
        <br />
        <button type="button" className="auth-button"  onClick={handleSignIn}>
          Sign In
        </button>
        <br />
        {error && <div className="error-message">{error}</div>}
        {signUp && (
          <button type="button" className="auth-button secondary-button"  onClick={handleSignUp}>
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
};

export default SignIn;
