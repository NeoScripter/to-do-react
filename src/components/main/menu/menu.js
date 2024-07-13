import React, { useState, useEffect } from "react";
import "./menu.css";
import AddTask from "./add-task-btn/add-task";
import SectionBtn from "./section-btn/SectionBtn";

function Menu() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const initialSections = !isMobile ? ["Dashboard", "Active", "Completed"] : ["Dashboard"];
    const [sectionNames, setSectionNames] = useState(initialSections);

    function toggleMenu() {
        setSectionNames(prevSectionNames =>
            prevSectionNames.length === initialSections.length
                ? ["Dashboard", "Active", "Completed"]
                : initialSections
        );
    }

    return (
        <div className="menu-wrapper">
            {!isMobile && <AddTask />}
            {sectionNames.map((sectionName, index) => (
                <SectionBtn key={`${sectionName}-${index}`} sectionName={sectionName} img={index === 0 ? true : false} toggle={toggleMenu} />
            ))}
        </div>
    );
}

export default Menu;
