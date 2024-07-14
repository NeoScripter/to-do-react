import React, { useState } from "react";
import "./add-task.css";
import add from "./add.svg";
import { addTask } from "../../../server/api";

function AddTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleCancel = () => {
      setShowPopup(false);
      setTitle("");
      setDescription("");
  };

    const AddToDo = async (e) => {
        e.preventDefault();
    };
    
    return (
        <>
            <button className="add-task-btn" onClick={() => setShowPopup(true)}>
                Add Task
                <img src={add} alt="add sign" />
            </button>
            {showPopup && (
              <div className="add-task-overlay">
              <form className="add-task-popup" onSubmit={AddToDo}>
                  <input
                      type="text"
                      placeholder="Add title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                      placeholder="Add description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      cols="50"
                  />
                  <div className="add-task-btn-group">
                      <button type="button" onClick={handleCancel}>Cancel</button>
                      <button type="submit">Save</button>
                  </div>
              </form>
          </div>
            )}
        </>
    );
}

export default AddTask;
