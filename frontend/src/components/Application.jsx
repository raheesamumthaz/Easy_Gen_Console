import React from 'react';
import './Application.css'; 

const Application = () => {
 
const user=localStorage.getItem('user',"hbeshd")


  return (
    <div className="application-container">
       { user!=undefined ? 
       (<h2 className="application-heading">Hi {user} Welcome to EasyGen Console application.</h2>)
       :(<h2 className="application-heading">Welcome to EasyGen Console application.</h2>)
    
      }

    </div>

  );
};

export default Application;
