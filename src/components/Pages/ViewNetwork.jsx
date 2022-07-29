import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { GenerateDetailsWithId } from '../../utils/DataFetch'
import { useGetNetworkTvQuery } from '../../services/themoviedbAPI'
import { nanoid } from '@reduxjs/toolkit'
import Spinner from '../../components/Spinner/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ViewNetworkTV = () => {
  const params = useParams()
  const { data: network, status: networkStatus } = GenerateDetailsWithId(params.id,useGetNetworkTvQuery)
  console.log(network, networkStatus, 'custom hook network details')

  const poster_url = 'https://image.tmdb.org/t/p/w500'


  if(networkStatus === 'fulfilled') {
    return (
      <Container fluid>
        <Row>
          <Col>
          <div className='viewers'>
            <div className='viewers__container'>
              {network.results.map(tvList => (
                
                <div className='viewers__wrapper' key={nanoid()}>
                  <Link to={`/tv/${tvList.id}`}>
                    <img
                      src={`${poster_url}${tvList.backdrop_path}`}
                      alt={tvList.name}
                      className='viewers__container__item__img'
                    />
                    <div className='viewers__wrapper--title'>
                    <h5>{tvList.name}</h5>
                  </div>
                  </Link>
                  


                </div>
              ))}
  
            </div>
          </div>
          </Col>
        </Row>
        </Container>
    )
  }

  else {
    return <Spinner />
  }

  
  
  
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <div className='viewers'>
            <div className='viewers__container'>
              <div className='viewers__wrapper'>
              <Link to={`/network/2739`}>
                <img src='/assets/images/viewers-disney.png' alt='' />
                
                
                </Link>
              </div>
              <div className='viewers__wrapper'>
                <img src='/assets/images/viewers-marvel.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/marvel.mp4' type='video/mp4' />
                </video>
              </div>
              <div className='viewers__wrapper'>
                <img src='/assets/images/viewers-national.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/national.mp4' type='video/mp4' />
                </video>
              </div>
              <div className='viewers__wrapper'>
                <img src='/assets/images/viewers-pixar.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/pixar.mp4' type='video/mp4' />
                </video>
              </div>
              <div className='viewers__wrapper'>
                <img src='/assets/images/viewers-starwars.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/starwars.mp4' type='video/mp4' />
                </video>
              </div>
              <div className='viewers__wrapper'>
                <img src='/assets/images/viewers-star.png' alt='' />
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                >
                  <source src='/assets/videos/star.mp4' type='video/mp4' />
                </video>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ViewNetworkTV
