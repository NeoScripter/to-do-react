import React, { useState, useEffect } from "react";
import "./header.css";
import logout from "./logout.svg";
import AddTask from "../main/menu/add-task-btn/add-task";

function Header({ setLoggedIn, currentSection, onTaskAdded }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 950);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 950);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("userId");
        setLoggedIn(false);
    };

    return (
        <header className="header-primary">
            <div className="logo">To-Do App</div>
            {!isMobile ? <div className="panel-state">{currentSection}</div> : <AddTask onTaskAdded={onTaskAdded} />}
            <button onClick={handleLogout} className="signout-btn">
                Sign out <img src={logout} alt="Sign out icon" />
            </button>
        </header>
    );
}

export default Header;
