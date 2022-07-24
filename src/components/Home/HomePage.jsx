import React from 'react'
import { Discover, Viewers } from '../index'
import {Action,Comedy,Trending, Upcoming} from './HomeIndex'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const HomePage = () => {
  return (
    <main className='home'>
      <Container fluid className='mt-n2'>
        <Row>
          <Col>
            <Discover />
          </Col>
        </Row>
        <Row>
          <Col>
            <Viewers />
          </Col>
        </Row>
        <Row>
          <Col>
          <div className="home-title mt-5 mb-n5"><h4>Trending</h4></div>
            <Trending />
          </Col>
        </Row>
        <Row>
          <Col>
          <div className="home-title mt-0 mb-n5"><h4>Action</h4></div>
            <Action />
          </Col>
        </Row>
        <Row>
          <Col>
          <div className="home-title mt-0 mb-n5"><h4>Comedy</h4></div>
            <Comedy />
          </Col>
        </Row>
        <Row>
          <Col>
          <div className="home-title mt-0 mb-n5"><h4>Upcoming</h4></div>
            <Upcoming />
          </Col>
        </Row>
        
      </Container>
    </main>
  )
}

export default HomePage
