import React from 'react'
import './BtnCounter.css'

function BtnCounter(props) {
    const { img, completed, content, bgColor } = props;
  
    const btnDisplayStyle = {
      backgroundColor: bgColor
    };
  
    return (
      <div className="btn-display" style={btnDisplayStyle}>
        <img src={img} alt="" className="btn-display-svg" />
        <div className="btn-display__flex-subgroup">
          <h3>{completed}</h3>
          <p>{content}</p>
        </div>
      </div>
    );
  }
export default BtnCounter