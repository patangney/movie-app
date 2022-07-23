import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

export const Sonnet = () => {
    return (
        <div>
            <h1>Sonnet</h1>
        </div>
    )
}




const TavNavigation = () => {
  return (
    <Tabs
      defaultActiveKey='details'
      id='justify'
      className='cucmzr mb-3'
      
    >
      <Tab eventKey='home' title='Home'>
        <Sonnet />
      </Tab>
      <Tab eventKey='profile' title='Profile'>
        <Sonnet />
      </Tab>
      <Tab eventKey='longer-tab' title='Loooonger Tab'>
        <Sonnet />
      </Tab>      
    </Tabs>
  )
}

export default TavNavigation
