import React, { useState } from 'react';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = () => {
    // Add logic to send the form data to the backend for authentication
    // For simplicity, let's assume a function called authenticateUser exists

    authenticateUser(formData)
      .then((response) => {
        // Handle successful authentication, e.g., redirect to the application page
        console.log('User authenticated successfully');
        // Add redirect logic here
      })
      .catch((error) => {
        // Handle authentication failure, e.g., display an error message
        console.error('Authentication failed:', error.message);
        // Add error handling logic here
      });
  };

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
      </form>
    </div>
  );
};

export default SignIn;
