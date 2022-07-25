import React, { useState, Fragment } from 'react'
import {
  useGetMovieByIdQuery,
  useGetMovieVideoQuery
} from '../../services/themoviedbAPI'
import { Chart as ChartJS, ArcElement } from 'chart.js'
import { GetMovieDataById } from '../../utils/DataFetch'
import { nanoid } from '@reduxjs/toolkit'
import { Doughnut } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import TavNavigation from './TavNavigation'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'
import CurrencyFormat from 'react-currency-format'
import Moment from 'react-moment'
import YouTube from 'react-youtube'

const Details = () => {
  ChartJS.register(ArcElement)
  const [show, setShow] = useState(false)
  const params = useParams()
  const data = GetMovieDataById(params.id, useGetMovieByIdQuery)
  const movie = data ? data : []

  const trailerData = GetMovieDataById(params.id, useGetMovieVideoQuery)
  console.log(trailerData, 'trailerData')
  const trailer = trailerData ? trailerData : []
  const key = trailer.results ? trailer.results[0].key : ''

  const isEmpty = Object.keys(movie).length === 0

  const emptyData = () => {
    return (
      <Fragment>
        <p>No Data</p>
      </Fragment>
    )
  }

  const BACKDROP_url =
    'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
  const poster_url = 'https://image.tmdb.org/t/p/w500'

  const userRatingAbs = Math.round(
    Math.abs(movie.vote_average, 10 - movie.vote_average)
  )

  // Convert Date object to string
  const movieDate = movie.release_date
  //User Rating
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

  const playTrailer = () => {
    console.log('playTrailer')
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    }
    return (
      <YouTube videoId={key} opts={opts} onReady={e => e.target.playVideo()} />
    )
  }

  if (isEmpty) return emptyData()
  else {
    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col md={12}>
              {/* {playTrailer()} */}
              <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName='modal-90w'
                aria-labelledby='example-custom-modal-styling-title'
              >
                <Modal.Header closeButton>
                  <Modal.Title id='example-custom-modal-styling-title'>
                    Custom Modal Styling
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Ipsum molestiae natus adipisci modi eligendi? Debitis amet
                    quae unde commodi aspernatur enim, consectetur. Cumque
                    deleniti temporibus ipsam atque a dolores quisquam quisquam
                    adipisci possimus laboriosam. Quibusdam facilis doloribus
                    debitis! Sit quasi quod accusamus eos quod. Ab quos
                    consequuntur eaque quo rem! Mollitia reiciendis porro quo
                    magni incidunt dolore amet atque facilis ipsum deleniti rem!
                  </p>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
        <div className='details ms-5 me-5'>
          <Container fluid className='my-5'>
            <Row className='align-items-start'>
              <Col xs={12} md={2}>
                <div className='details__image-title'>
                  <img
                    className='shadow rounded'
                    src={`${poster_url}${movie.poster_path}`}
                    alt=''
                  />
                </div>
                <div className='details__image-bg'>
                  <img src={`${BACKDROP_url}${movie.backdrop_path}`} alt='' />
                  <div className='details__image-overlay'></div>
                </div>
              </Col>
              <Col xs={12} md={8}>
                <h1 className='fs-1'>{movie.original_title}</h1>
                <h3 className='fs-5 '>"{movie.tagline}"</h3>

                <h5>
                  Release Date:{' '}
                  <Moment format='MMMM Do YYYY'>{movieDate}</Moment>
                </h5>

                <h5>
                  Genre
                  {movie.genres
                    ? movie.genres.map(genre => (
                        <span
                          key={nanoid()}
                          className='my-1 ms-2 me-1 badge bg-warning text-dark'
                        >
                          {genre.name}
                        </span>
                      ))
                    : null}
                </h5>

                {/* doughnut chart */}
                <Container>
                  <Row className='align-items-start'>
                    <Col xs={12} md={3}>
                      <div className='details__controls'>
                        <Stack direction='horizontal' gap={1}>
                          <button
                            onClick={playTrailer}
                            className='details__controls--trailerButton'
                          >
                            <img
                              src='/assets/images/play-icon-white.png'
                              alt='play'
                            />
                            <span>Trailer</span>
                          </button>
                        </Stack>
                        <Stack direction='horizontal' gap={2}>
                          <button className='details__controls--addButton'>
                            <img
                              src='/assets/images/watchlist-icon.svg'
                              alt='group'
                            />
                          </button>
                        </Stack>
                        <Stack direction='horizontal' gap={2}>
                          <button className='details__controls--groupWatchButton'>
                            <img
                              src='/assets/images/group-icon.png'
                              alt='group'
                            />
                          </button>
                        </Stack>
                        <Stack direction='horizontal' gap={2}>
                          <div className='consensus'>
                            <div className='consensus__outer_ring'>
                              <Doughnut data={userRating} />
                            </div>
                          </div>
                        </Stack>
                        <Stack direction='horizontal' gap={2}>
                          Rating {userRatingAbs}
                        </Stack>
                      </div>
                    </Col>
                    <Col xs={12} md={3}></Col>
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
                  <div className='vr' />
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
                    <span className='text-white'>{movie.runtime} minutes</span>
                  </div>
                </Stack>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row>
              <Col xs={12} md={8}>
                <p className='details__info--text'>{movie.overview}</p>
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
      </Fragment>
    )
  }
}

export default Details
