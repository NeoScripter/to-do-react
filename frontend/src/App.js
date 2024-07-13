import Header from './components/header/header';
import Main from './components/main/main';
import Signup from './components/server/Signup';
import React, { useState, useEffect } from 'react';
import Login from './components/server/Login';
/* import TaskList from './TaskList'; */

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="wrapper">
      {loggedIn ? (
        null
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
      <Header setLoggedIn={setLoggedIn} />
      <Main />
    </div>
  );
}

export default App;
