import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { Cast, Reviews, Collection, SimilarMovies } from './detailsIndex'

export const Sonnet = () => {
  return (
    <div>
      <h1>todo</h1>
    </div>
  )
}

const TavNavigation = () => {
  return (
    <Tabs
      defaultActiveKey='cast'
      id='justify'
      className='bottom-border mb-3 my-5'
    >
      <Tab eventKey='cast' title='Cast'>
        <Cast />
      </Tab>
      <Tab eventKey='reviews' title='Reviews'>
        <Reviews />
      </Tab>
      <Tab eventKey='similar' title='Similar'>
        <SimilarMovies />
      </Tab>      
      <Tab eventKey='collection' title='Collection'>
        <Collection />
      </Tab>
    </Tabs>
  )
}

export default TavNavigation
