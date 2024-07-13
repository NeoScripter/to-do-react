import React, { useState, useEffect } from "react";
import "./menu.css";
import AddTask from "./add-task-btn/add-task";
import SectionBtn from "./section-btn/SectionBtn";

function Menu({ isMobile, currentSection, setCurrentSection }) {
    const [sectionNames, setSectionNames] = useState(["Dashboard", "Active", "Completed"]);

    useEffect(() => {
        setSectionNames(!isMobile ? ["Dashboard", "Active", "Completed"] : [currentSection]);
    }, [isMobile, currentSection]);

    function changeCurrentSection(sectionName) {
        setCurrentSection(sectionName);
    }

    function toggleMenu() {
        if (isMobile) {
            setSectionNames(prevSectionNames =>
                prevSectionNames.length === 1 && prevSectionNames[0] === currentSection
                    ? ["Dashboard", "Active", "Completed"]
                    : [currentSection]
            );
        }
    }

    return (
        <div className="menu-wrapper">
            {!isMobile && <AddTask />}
            {sectionNames.map((sectionName, index) => (
                <SectionBtn
                    key={`${sectionName}-${index}`}
                    sectionName={sectionName}
                    img={index === 0}
                    toggle={toggleMenu}
                    changeSection={changeCurrentSection}
                    currentSection={currentSection}
                />
            ))}
        </div>
    );
}

export default Menu;
