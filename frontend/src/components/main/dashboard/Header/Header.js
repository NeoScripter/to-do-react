import React, { useState } from "react";
import "./Header.css";
import { deleteTasksForUser } from "../../../server/api";

function Header({ displayDeleteBtn, onTaskAdded }) {
    const [showPopup, setShowPopup] = useState(false);

    const handleCancel = () => {
        setShowPopup(false);
    };

    const handleDeletion = async (e) => {
      e.stopPropagation(); 
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await deleteTasksForUser(userId);
        if (response.data.success) {
          onTaskAdded();
          setShowPopup(false);
        } else {
          alert("Deletion failed");
        }
      } catch (error) {
        console.error("Deletion error", error);
        alert("Deletion error: " + error.message);
      }
    };

    function formatDate() {
        const date = new Date();
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }

    return (
        <>
            <div className="list-header">
                <h2>Today’s Tasks</h2>
                {displayDeleteBtn && (
                    <button className="delete-all-btn" onClick={() => setShowPopup(true)}>
                        Delete All
                    </button>
                )}
                <p>{formatDate()}</p>
            </div>
            {showPopup && (
                <div className="delete-all-overlay">
                    <div className="delete-all-popup">
                        <p className="delete-all-warning">Are you sure you want to delete all todos?</p>
                        <div className="delete-all-btn-group">
                            <button type="button" onClick={handleCancel}>
                                No
                            </button>
                            <button type="submit" onClick={handleDeletion}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
