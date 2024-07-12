import React from 'react'
import './SectionBtn.css'

function SectionBtn(props) {
  return (
    <button className="section-btn">{props.sectionName}</button>
  )
}

export default SectionBtn