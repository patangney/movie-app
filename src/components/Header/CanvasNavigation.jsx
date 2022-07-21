
import React,{useState,Fragment} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {FaAppStore} from 'react-icons/fa';
import { FaHome, FaStar } from "react-icons/fa";


function CanvasNavigation() {
  
  const expand = 'lg'
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const ExploreKillarney = [
    {
      name: 'Eat & Drink',
      icon: FaAppStore,
      routerPath: '/blog/Eat&Drink/'
    }
  ]

  return (
    <Fragment>
      <div className={show ? 'burgerMenu opened ' : 'burgerMenu d-lg-none'}  onClick={handleShow}>
      <svg width='50' height='50' viewBox='0 0 100 100'>
        <path
          className='line line1'
          d='M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'
        />
        <path className='line line2' d='M 20,50 H 80' />
        <path
          className='line line3'
          d='M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'
        />
      </svg>
      </div>      
    
      <Navbar.Offcanvas show={show ? show: undefined} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className='me-auto nav-theme'>
                <LinkContainer to='/'>
                  <Nav.Link active><FaHome className='me-1' /><span>Home</span></Nav.Link>
                </LinkContainer>
                <LinkContainer to='/popular'>
                  <Nav.Link><span>Popular</span></Nav.Link>
                </LinkContainer>
                <LinkContainer to='/top-rated'>
                  <Nav.Link><FaStar className='me-1'/><span>Top Rated</span></Nav.Link>
                </LinkContainer>
              </Nav>              
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Fragment>
  )
}

export default CanvasNavigation;