import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import preview from "./preview.png";
import Header from "./Header/Header";
import List from "./List/List";
import BtnGroup from "./BtnGroup/BtnGroup";

function Dashboard() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 550);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 550);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-top">
                <h1 className="greeting">Hello there!</h1>
                <p>What do you want to do today?</p>
                <img src={preview} alt="young smiling woman working at laptop" className="preview-img" />
            </div>
            {isMobile && <BtnGroup />}
            <Header />
            <div className="list__flex-group">
                <List />
                {!isMobile && <BtnGroup />}
            </div>
        </div>
    );
}

export default Dashboard;
