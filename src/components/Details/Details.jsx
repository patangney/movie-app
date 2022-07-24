import React, {useState} from 'react'
import { movieAPI, useGetMovieByIdQuery, useGetMovieVideoQuery } from '../../services/themoviedbAPI'
import { Chart as ChartJS, ArcElement } from 'chart.js'
import { nanoid } from '@reduxjs/toolkit'
import { Doughnut } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import TavNavigation from './TavNavigation'
import Spinner from '../Spinner/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import CurrencyFormat from 'react-currency-format'


ChartJS.register(ArcElement)



const Details = () => {
  const params = useParams()

  const GetVideos = movieId => {
    const { data = [] } = movieAPI.endpoints.getMovieVideo.useQuery(movieId)
    const getMovieTrailer = data.results ? data.results : []
    console.log(getMovieTrailer)
   
  }

 


  
  
  // console.log(params, 'params')
  const { data, isLoading, isFetching, isError } = useGetMovieByIdQuery(params.id)
  // console.log(data, 'data from useGetMovieByIdQuery ')

    let movie = data ? data : {}
    const isEmpty = Object.keys(movie).length === 0

    
    
    const BACKDROP_url =
    'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
    const poster_url = 'https://image.tmdb.org/t/p/w500'
    
    if (isError) return <div>Error!</div>
    if (isLoading && !data) return <Spinner /> 

       
   

  const userRatingAbs = Math.round(
    Math.abs(movie.vote_average, 10 - movie.vote_average)
  )

  // Convert Date object to string
  const movieDate = movie.release_date
  const parts = movieDate.split('-')
  const mydate = new Date(parts[0], parts[1] - 1, parts[2])
  const movieDateString = mydate.toDateString()

  const userRating = {
    datasets: [
      {
        data: [movie.vote_average, 10 - movie.vote_average],

        backgroundColor: ['#9BC53D', 'rgba(0, 0, 0, 0.1)'],
        borderColor: ['#9BC53D', 'rgba(0, 0, 0, 0.2)'],
        borderWidth: 0.5
      }
    ]
  }

  if (isEmpty) {
    return (
      <div className='details'>
        <h1>No movie found</h1>
      </div>
    )
  } else {
    return (
      <div className={isFetching ? <Spinner /> : 'loaded'}>
        <div className='details ms-5 me-5'>
          <Container fluid className='my-5'>
            <Row className='align-items-start'>
              <Col xs={12} md={2}>
                <div className='details__image-title'>
                  <img className='shadow rounded' src={`${poster_url}${movie.poster_path}`} alt='' />
                </div>
                <div className='details__image-bg'>
                  <img src={`${BACKDROP_url}${movie.backdrop_path}`} alt='' />
                  <div className='details__image-overlay'></div>
                </div>
              </Col>
              <Col xs={12} md={8}>
                <h1 className='fs-1'>{movie.original_title}</h1>
                <h3 className='fs-5 '>"{movie.tagline}"</h3>

                <h5>Release Date: {movieDateString}</h5>

                <h5>
                  Genre
                  {movie.genres.map(genre => (
                    <span key={nanoid()} className='my-1 ms-2 me-1 badge bg-warning text-dark'>
                      {genre.name}
                    </span>
                  ))}
                </h5>

                {/* doughnut chart */}
                <Container>
                  <Row className="align-items-start">
                    <Col xs={12} md={2}>
                    <div className='consensus mb-5'>
                    <div className='consensus__outer_ring'>
                      <Doughnut data={userRating} />
                      </div>
                      Rating {userRatingAbs}{' '}
                    </div>
                    
                    </Col>
                    <Col xs={12} md={2}>
                   
                    </Col>
                  </Row>
                </Container>
                
                
                  

                <Stack direction='horizontal' gap={3}>
                <div>
                    Budget:{' '}
                    <CurrencyFormat
                      value={movie.budget}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </div>
                  <div className="vr" />
                  <div>
                    Revenue:{' '}
                    <CurrencyFormat
                      value={movie.revenue}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </div>
                  
            
                </Stack>
                <Stack direction='horizontal' gap={3}>
                  <div>
                    Runtime:{' '}
                    <span className='text-white'>
                      {movie.runtime} minutes
                    </span>
                  </div>
                </Stack>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row>
              <Col xs={12} md={8}>
                <p className={isFetching ? <Spinner /> : 'details__info--text'}>
                  {movie.overview}
                </p>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='navigation ms-5 me-5'>
          <Container fluid>
            <Row>
              <Col xs={12} md={12}>
                <TavNavigation />
              </Col>
            </Row>
          </Container>
          </div>
          
      </div>
    )
  }
}

export default Details
