import React, { useState, useEffect, useRef } from "react";
import "./ListItem.css";
import pending from "./checkbox-pending.svg";
import finished from "./checkbox-finished.svg";
import edit from "./edit.svg";
import { deleteTask, editTask, completeTask } from "../../../../server/api";

function ListItem(props) {
    const { id, done, text, currentSection, description, createdAt, openListItemId, setOpenListItemId, onTaskAdded } = props;
    const extraClass = done === true ? " finished" : "";
    const imagePath = done === true ? finished : pending;
    const openEditPanel = openListItemId === id && currentSection !== "Dashboard";
    const [isEdited, setIsEdited] = useState(false);
    const [itemTitle, setItemTitle] = useState(text);
    const [itemDescription, setItemDescription] = useState(description);

    const formRef = useRef();
    const onSetEdited = () => {
        if (isEdited) {
            handleTaskEditing();
        }
        setIsEdited((prev) => !prev);
    };


    const handleDeletion = async (e) => {
        e.stopPropagation(); 
        try {
          const response = await deleteTask(id);
          if (response.data.success) {
            onTaskAdded();
          } else {
            alert("Deletion failed");
          }
        } catch (error) {
          console.error("Deletion error", error);
          alert("Deletion error: " + error.message);
        }
      };

      const handleCompletion = async (e) => {
        e.stopPropagation(); 
        try {
          const response = await completeTask(id);
          if (response.data.success) {
            onTaskAdded();
          } else {
            alert("Completion failed");
          }
        } catch (error) {
          console.error("Completion error", error);
          alert("Completion error: " + error.message);
        }
      };

      const handleTaskEditing = async () => {
        try {
          const response = await editTask(id);
          if (response.data.success) {
            onTaskAdded();
          } else {
            alert("Editing failed");
          }
        } catch (error) {
          console.error("Editing error", error);
          alert("Editing error: " + error.message);
        }
      };

    useEffect(() => {
        setOpenListItemId(null);
    }, [currentSection, setOpenListItemId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setOpenListItemId(null);
                if (isEdited) {
                    setIsEdited(false);
                }
            }
        };

        if (openEditPanel) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openEditPanel, setOpenListItemId, isEdited]);

    const handleTitleChange = (e) => {
        setItemTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setItemDescription(e.target.value);
    };
    const handleItemClick = () => {
        setOpenListItemId(id);
    };

    function timeAgo(timestamp) {
        const currentTime = new Date();
        const pastTime = new Date(timestamp);
        const differenceInMilliseconds = currentTime - pastTime;

        const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
        const differenceInDays = Math.floor(differenceInHours / 24);

        if (differenceInHours < 24) {
            return `Added ${differenceInHours} hours ago`;
        } else {
            return `Added ${differenceInDays} days ago`;
        }
    }

    return (
        <div className={"todo-list-item" + extraClass} onClick={handleItemClick}>
            <div className="checkbox-wrapper">
                <img src={imagePath} alt="" />
            </div>
            <p className="todo-list-item__content">{text}</p>
            {openEditPanel && (
                <form className="todo-list-item__details" ref={formRef} onClick={(e) => e.stopPropagation()}>
                    <input
                        className="todo-list-item__title"
                        value={itemTitle}
                        readOnly={!isEdited}
                        onChange={handleTitleChange}
                    />
                    <p className="todo-list-item__added-time">{timeAgo(createdAt)}</p>
                    <h4 className="todo-list-item__h4">Description</h4>
                    <textarea
                        className="todo-list-item__description-content"
                        rows="3"
                        cols="20"
                        value={itemDescription}
                        readOnly={!isEdited}
                        onChange={handleDescriptionChange}
                    />
                    <div class="todo-list-item__controls-wrapper">
                        <div class="todo-list-item__active-svg-wrapper todo-list-item__svg-wrapper" onClick={handleCompletion}>
                            {done === false ? <img src={pending} alt="" /> : <img src={finished} alt="" />}
                        </div>
                        <div class="todo-list-item__edit-svg-wrapper todo-list-item__svg-wrapper" onClick={onSetEdited}>
                            <img src={edit} alt="" />
                        </div>
                        <div class="todo-list-item__delete-svg-wrapper todo-list-item__svg-wrapper" onClick={handleDeletion}>
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="ant-design:delete-outlined">
                                    <path
                                        id="Vector"
                                        d="M11.25 5.75H11C11.1375 5.75 11.25 5.6375 11.25 5.5V5.75ZM11.25 5.75H20.75V5.5C20.75 5.6375 20.8625 5.75 21 5.75H20.75V8H23V5.5C23 4.39688 22.1031 3.5 21 3.5H11C9.89687 3.5 9 4.39688 9 5.5V8H11.25V5.75ZM27 8H5C4.44687 8 4 8.44688 4 9V10C4 10.1375 4.1125 10.25 4.25 10.25H6.1375L6.90938 26.5938C6.95938 27.6594 7.84063 28.5 8.90625 28.5H23.0938C24.1625 28.5 25.0406 27.6625 25.0906 26.5938L25.8625 10.25H27.75C27.8875 10.25 28 10.1375 28 10V9C28 8.44688 27.5531 8 27 8ZM22.8531 26.25H9.14688L8.39062 10.25H23.6094L22.8531 26.25Z"
                                        fill="#EDB046"
                                    />
                                </g>
                            </svg>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ListItem;
