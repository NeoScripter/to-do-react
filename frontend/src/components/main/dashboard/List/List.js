import React from 'react'
import './List.css'
import ListItem from './ListItem/ListItem'

function List({todos, currentSection}) {
  return (
    <div className='todo-list'>
      {todos.map((todo) => (
        <ListItem 
        key={todo.id}
        done={todo.done}
        text={todo.text}
        currentSection = {currentSection}
        description={todo.description}
        createdAt={todo.created_at}
        />
      ))}
    </div>
  )
}

export default List