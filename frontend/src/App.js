import Header from './components/header/header';
import Main from './components/main/main';
import Register from './Register';
import React, { useState, useEffect } from 'react';
import Login from './Login';
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
      <Header />
      <Main />
    </div>
  );
}

export default App;
