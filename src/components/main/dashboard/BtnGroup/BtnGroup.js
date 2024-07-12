import React from 'react'
import BtnCounter from './BtnCounter/BtnCounter'
import active from './active.svg'
import completed from './completed.svg'
import './BtnGroup.css'

function BtnGroup() {
  return (
    <div className='btn-group-wrapper'>
        <BtnCounter 
        img={completed}
        completed="40%" 
        content="Completed tasks" 
        bgColor="var(--dark-orange)" 
      />
      <BtnCounter 
        img={active}
        completed="60%" 
        content="Active tasks" 
        bgColor="var(--light-orange)" 
      />
    </div>
  )
}

export default BtnGroup