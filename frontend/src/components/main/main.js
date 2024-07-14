import React, { useState, useEffect } from "react";
import "./main.css";
import Menu from "./menu/menu";
import Dashboard from "./dashboard/Dashboard";

function Main() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
    const [currentSection, setCurrentSection] = useState("Dashboard");
    const [refresh, setRefresh] = useState(false); 
    const onTaskAdded=() => setRefresh(prev => !prev);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="main-wrapper">
            <Menu
                isMobile={isMobile}
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                onTaskAdded={onTaskAdded}
            />
            <Dashboard currentSection={currentSection} refresh={refresh}/>
        </div>
    );
}

export default Main;
