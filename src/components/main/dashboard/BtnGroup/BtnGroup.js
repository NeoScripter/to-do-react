import React from 'react'
import BtnCounter from './BtnCounter/BtnCounter'
import active from './active.svg'
import completed from './completed.svg'
import './BtnGroup.css'

function BtnGroup(props) {
  return (
    <div className='btn-group-wrapper'>
        <BtnCounter 
        img={completed}
        completed={props.counts.done + "%"} 
        content="Completed tasks" 
        bgColor="var(--dark-orange)" 
      />
      <BtnCounter 
        img={active}
        completed={props.counts.notDone + "%"}
        content="Active tasks" 
        bgColor="var(--light-orange)" 
      />
    </div>
  )
}

export default BtnGroup