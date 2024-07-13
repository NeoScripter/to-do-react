import React, { useState, useEffect } from "react";
import './SectionBtn.css'
import arrow from './arrow-down.svg'

function SectionBtn(props) {
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

  const isCurrent = props.currentSection === props.sectionName ? true : false;
  const extraClass = isCurrent ? " active-section" : "";
  return (
    <button className={"section-btn" + extraClass} onClick={() => {
      props.toggle();
      props.changeSection(props.sectionName);
    }}>
      {props.sectionName}
      {(isMobile && props.img === true) && <img src={arrow} alt="arrow down" className="arrow-down-svg"/>}
    </button>
  )
}

export default SectionBtn