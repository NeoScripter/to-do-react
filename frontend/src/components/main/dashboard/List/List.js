import React, { useState } from 'react'
import './List.css'
import ListItem from './ListItem/ListItem'

function List({todos, currentSection, onTaskAdded}) {
  const [openListItemId, setOpenListItemId] = useState(null);

  return (
    <div className='todo-list'>
      {todos.map((todo) => (
        <ListItem 
        key={todo.id}
        id={todo.id}
        done={todo.done}
        text={todo.text}
        currentSection = {currentSection}
        description={todo.description}
        createdAt={todo.created_at}
        openListItemId={openListItemId}
        setOpenListItemId={setOpenListItemId}
        onTaskAdded={onTaskAdded}
        />
      ))}
    </div>
  )
}

export default List