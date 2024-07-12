import React, { useState, useEffect } from 'react';
import './main.css';
import Menu from './menu/menu';
import Dashboard from './dashboard/Dashboard';

function Main() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="main-wrapper">
        {!isMobile && <Menu />}
        <Dashboard />
    </div>
  )
}

export default Main