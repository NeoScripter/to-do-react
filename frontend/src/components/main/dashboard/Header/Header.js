import React from 'react'
import './Header.css'

function Header({displayDeleteBtn}) {
  function formatDate() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

  return (
    <div className='list-header'>
        <h2>Today’s Tasks</h2>
        {displayDeleteBtn && <button className="delete-all-btn">Delete All</button>}
        <p>{formatDate()}</p>
    </div>
  )
}

export default Header