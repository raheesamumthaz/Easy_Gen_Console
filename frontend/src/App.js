import React from 'react';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Application from './components/Application';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/application" element={<Application />} />
      </Routes>
    </Router>
  );
}


export default App;
