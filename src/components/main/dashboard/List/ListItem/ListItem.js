import React from "react";
import "./ListItem.css";
import pending from './checkbox-pending.svg';
import finished from './checkbox-finished.svg';

function ListItem(props) {
    const { done, text } = props;
    const extraClass = done === true ? ' finished' : '';
    const imagePath = done === true ? finished : pending;
    return (
    <div className={"todo-list-item" + extraClass}>
        <div className="checkbow-wrapper">
            <img src={imagePath} alt="" />
        </div>
        <p className="todo-list-item__content">{text}</p>
    </div>
    );
}

export default ListItem;
