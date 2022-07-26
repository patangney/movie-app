import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Biography = ({ limit, children }) => {
  const [isReadMoreShown, setReadMoreShown] = useState(false)
  const [hideButton, setHideButton] = useState(false)
  
  const toggleReadMore = () => {
    setReadMoreShown(prevState => !prevState)
    console.log(isReadMoreShown)
  }
  
  return (
    <div className='biography'>
      <Container fluid className='mt-n2'>
        <Row>
          <Col>
            {isReadMoreShown ? children : children.slice(0, limit)}
            <Button id='readMore' className='btn btn-small' onClick={toggleReadMore} variant='primary' size='sm'>
                {isReadMoreShown ? 'Read Less' : 'Read More'}
            </Button>{' '}
            <div className="mb-2"></div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Biography
