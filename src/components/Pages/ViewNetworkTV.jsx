import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { GenerateDetailsWithId } from '../../utils/DataFetch'
import { useGetNetworkTvQuery } from '../../services/themoviedbAPI'
import { nanoid } from '@reduxjs/toolkit'
import Spinner from '../Spinner/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moviePlaceholder from '../../assets/placeholder/video-placeholder.svg'

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
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = moviePlaceholder
                      }}
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
}

  
  
  
  

export default ViewNetworkTV
