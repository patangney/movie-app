import React, {Fragment} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import LogoWhite from '../../assets/Logo/logo-white.svg'
import CanvasNavigation from './CanvasNavigation'

function Navigation () {  
 
  const expand = 'lg'
  return (
    <Fragment>
      <Navbar sticky="top" key={expand} variant="dark" bg='dark' expand={expand} className='mb-3'>
        <Container fluid>
          <LinkContainer to={'/'}>
            <Navbar.Brand href='/'>
              <img
                src={LogoWhite}
                width='50'
                style={{marginRight: 50, marginLeft: 20}}
                className='d-inline-block align-top mr-5'
              />
            </Navbar.Brand>
          </LinkContainer>
          {/* ---- ./logo ---- */}          
          <CanvasNavigation />    
        </Container>
      </Navbar>
    </Fragment>
  )
}

export default Navigation
