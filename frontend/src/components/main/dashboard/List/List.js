import React from 'react'
import './List.css'
import ListItem from './ListItem/ListItem'

function List(props) {
  return (
    <div className='todo-list'>
      {props.todos.map((todo) => (
        <ListItem 
        key={todo.id}
        done={todo.done}
        text={todo.text}
        />
      ))}
    </div>
  )
}

export default List