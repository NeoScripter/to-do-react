import React from 'react'
import BtnCounter from './BtnCounter/BtnCounter'
import active from './active.svg'
import completed from './completed.svg'
import './BtnGroup.css'

function BtnGroup(props) {
  const doneTasks = isNaN(props.counts.done) ? "No" : props.counts.done + "%";
  const unfinishedTasks = isNaN(props.counts.notDone) ? "No" : props.counts.notDone + "%";
  return (
    <div className='btn-group-wrapper'>
        <BtnCounter 
        img={completed}
        completed={doneTasks} 
        content="Completed tasks" 
        bgColor="var(--dark-orange)" 
      />
      <BtnCounter 
        img={active}
        completed={unfinishedTasks}
        content="Active tasks" 
        bgColor="var(--light-orange)" 
      />
    </div>
  )
}

export default BtnGroup