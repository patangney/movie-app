import React from 'react'
import { Discover, Viewers } from '../index.js'
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
        
      </Container>
    </main>
  )
}

export default HomePage
