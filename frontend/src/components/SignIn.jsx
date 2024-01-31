import React, { useState } from 'react';
import config from '../config.json'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endpoint=config.apiUrl+"/auth/signin"
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    signUp: false
  });
  const [error, setError]=useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = () => {
   
    setError('')
    setFormData({ ...formData, ["signUp"]: false });
    axios.post(endpoint, formData)
      .then((response) => {
     
        console.log('User authenticated successfully');
        navigate('/application');
      })
      .catch((error) => {
        
        
        console.error('Authentication failed:',error.response.data.message,error);
        setError(error.response.data.message); 
        console.log("statsucode...",error.response.status)
        if((error.response.status)===404){
          setFormData({ ...formData, ["signUp"]: true });
          console.log("please signup")
        }
       
       
      });
  };
  const handleSignUp=()=>{
    navigate('/signup');
  }
  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <label>Email: </label>
        <input type="email" name="email" onChange={handleInputChange} />
        <br />
        <label>Password: </label>
        <input type="password" name="password" onChange={handleInputChange} />
        <br />
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
        <br />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {formData.signUp &&(
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
};

export default SignIn;
