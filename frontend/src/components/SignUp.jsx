import React, { useState } from 'react';
import config from '../config.json'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endpoint=config.apiUrl+"/auth/signup"

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    signIn: false
  });

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
    setFormData({ ...formData, ["signIn"]: false });
    axios.post(endpoint, formData)
    .then((response) => {

      console.log("response....",response);
       navigate('/application');
      
    })
    .catch((error) => {
      
      console.error('Authentication failed:',error.response.data.message);
      setError(error.response.data.message); 
      console.log("statsucode...",error.response.status)
      if((error.response.status)===409){
        setFormData({ ...formData, ["signIn"]: true });
        console.log("please signin")
      }
      
    });

  };

  const handleSignIn=()=>{
    navigate('/signin');
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>Email: </label>
        <input type="email" name="email" onChange={handleInputChange} />
        <br />
        <label>Name: </label>
        <input type="text" name="name" onChange={handleInputChange} />
        <br />
        <label>Password: </label>
        <input type="password" name="password" onChange={handleInputChange} onBlur={validatePassword}/>
        {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
       
        <br />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <br />
        {error && <div style={{ color: 'red' }}>{error}</div>}



        {formData.signIn &&(
          <button type="button" onClick={handleSignIn}>
            Sign In
          </button>
        )}
       
      </form>
    </div>
  );
};

export default SignUp;
