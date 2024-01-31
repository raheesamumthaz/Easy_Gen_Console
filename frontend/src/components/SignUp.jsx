import React, { useState } from 'react';


const SignUp = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const validatePassword = () => {
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
    validatePassword();
    // Send POST request to backend for user registration
    // Redirect to application page on success
  };

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
      </form>
    </div>
  );
};

export default SignUp;
