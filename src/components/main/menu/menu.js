import React from "react";
import "./menu.css";
import AddTask from "./add-task-btn/add-task";
import SectionBtn from "./section-btn/SectionBtn";

function Menu() {
    const sectionNames = ["Dashboard", "Active", "Completed"];

    return (
        <div className="menu-wrapper">
            <AddTask />
           {sectionNames.map((sectionName, index) => (
                <SectionBtn key={`${sectionName}-${index}`} sectionName={sectionName} />
            ))}
        </div>
    );
}

export default Menu;
