import React from 'react'
import './List.css'
import ListItem from './ListItem/ListItem'

function List() {
  return (
    <div className='todo-list'>
        <ListItem 
        done={false}
        text="Buy monthly groceries" 
        />
        <ListItem 
        done={true}
        text="Pick up the kids" 
        />
    </div>
  )
}

export default List