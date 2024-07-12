import React from 'react'
import './add-task.css'
import add from './add.svg'

function AddTask() {
  return (
    <button className="add-task-btn">
        Add Task
        <img src={add} alt="add sign"/>
    </button>
  )
}

export default AddTask;