import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Viewers = () => {
  
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <div className='viewers'>
            <div className='viewers__container'>
              <div className='viewers__wrapper'>
              <Link to={`/network/2739`}> {/* 2739 = disney+ */}
                <img src='/assets/images/viewers-disney.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/disney.mp4' type='video/mp4' />
                </video>
                </Link>
              </div>
              <div className='viewers__wrapper'>
              <Link to={`/company/420`}> {/* /company/420 MARVEL STUDIOS*/}
                <img src='/assets/images/viewers-marvel.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/marvel.mp4' type='video/mp4' />
                </video>
                </Link>
              </div>
              <div className='viewers__wrapper'>
              <Link to={`/network/43`}> {/* /network/43 = National Geographic */}
                <img src='/assets/images/viewers-national.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/national.mp4' type='video/mp4' />
                </video>
                </Link>
              </div>
              <div className='viewers__wrapper'>
              <Link to={`/company/3`}> {/* /company/3 = Pixar */}
                <img src='/assets/images/viewers-pixar.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/pixar.mp4' type='video/mp4' />
                </video>
                </Link>
              </div>
              <div className='viewers__wrapper'>
              <Link to={`/network/2739`}>
                <img src='/assets/images/viewers-starwars.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/starwars.mp4' type='video/mp4' />
                </video>
                </Link>
              </div>
              <div className='viewers__wrapper'>
              <Link to={`/network/4697`}>
                <img src='/assets/images/viewers-star.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/star.mp4' type='video/mp4' />
                </video>
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Viewers
