import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './assets/css/transitions.css';
import Reg from './components/server/Reg';
import { login, register } from './components/server/api';
import Header from './components/header/header';
import Main from './components/main/main';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      setLoggedIn(true);
    }
  }, []);

  const handleAction = async (e) => {
    e.preventDefault();
    if (isSignup) {
      // Signup API
      try {
        const response = await register(username, password);
        if (response.data.success) {
          alert('Signup success!');
        } else {
          alert('Signup failed');
        }
      } catch (error) {
        console.error('Signup error', error);
        alert('Signup error: ' + error.message);
      }
    } else {
      // Login API
      try {
        const response = await login(username, password);
        if (response.data.success) {
          sessionStorage.setItem('userId', response.data.userId);
          setLoggedIn(true);
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Login error', error);
        alert('Login error: ' + error.message);
      }
    }
  };

  const switchAction = () => {
    setIsSignup(!isSignup);
  };

  const actionName = isSignup ? 'Sign Up' : 'Log In';

  return (
    <div className="wrapper">
      {loggedIn ? (
        <>
          <Header setLoggedIn={setLoggedIn} />
          <Main />
        </>
      ) : (
        <TransitionGroup>
          <CSSTransition
            key={actionName}
            timeout={500}
            classNames="fade"
          >
            <Reg
              username={username}
              password={password}
              handleAction={handleAction}
              setUsername={setUsername}
              setPassword={setPassword}
              actionName={actionName}
              switchAction={switchAction}
            />
          </CSSTransition>
        </TransitionGroup>
      )}
    </div>
  );
}

export default App;
