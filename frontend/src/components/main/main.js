import React, { useState, useEffect } from "react";
import "./main.css";
import Menu from "./menu/menu";
import Dashboard from "./dashboard/Dashboard";

function Main() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
    const [currentSection, setCurrentSection] = useState("Dashboard");

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
            />
            <Dashboard currentSection={currentSection} />
        </div>
    );
}

export default Main;
