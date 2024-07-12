import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='list-header'>
        <h2>Today’s Tasks</h2>
        <button className="delete-all-btn">Delete All</button>
        <p>Monday, 18 December 2023</p>
    </div>
  )
}

export default Header