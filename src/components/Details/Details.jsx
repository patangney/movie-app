import React, { useState, Fragment } from 'react'
import {
  useGetMovieByIdQuery,
  useGetMovieVideoQuery
} from '../../services/themoviedbAPI'
import { Chart as ChartJS, ArcElement } from 'chart.js'
import { GenerateDetailsWithId } from '../../utils/DataFetch'
import { nanoid } from '@reduxjs/toolkit'
import { Doughnut } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import TavNavigation from './TavNavigation'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import CurrencyFormat from 'react-currency-format'
import Moment from 'react-moment'
import Spinner from '../Spinner/Spinner'
import ModalVideo from 'react-modal-video'

const Details = () => {
  ChartJS.register(ArcElement)
  const params = useParams()

  const [isOpen, setOpen] = useState(false)
  const { data: movie, status: movieStatus } = GenerateDetailsWithId(
    params.id,
    useGetMovieByIdQuery
  )
  const { data: videos, status: videoStatus } = GenerateDetailsWithId(
    params.id,
    useGetMovieVideoQuery
  )

  console.log(movie, movieStatus, 'custom hook movie details')

  if (movieStatus === 'fulfilled' && videoStatus === 'fulfilled') {
    //Check if there are any videos
    const isEmptyTrailer = Object.keys(videos.results).length === 0
    const key = isEmptyTrailer ? 'dQw4w9WgXcQ' : videos.results[0].key

    const BACKDROP_url =
      'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
    const poster_url = 'https://image.tmdb.org/t/p/w500'

    const userRatingAbs = Math.round(
      Math.abs(movie.vote_average, 10 - movie.vote_average)
    )

    // Convert Date object to string
    const movieDate = movie.releaseDate

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
    return (
      <Fragment>
        {/* <ModalVideo /> */}

        <ModalVideo
          channel='youtube'
          autoplay
          isOpen={isOpen}
          videoId={key}
          onClose={() => setOpen(false)}
        />
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
                            onClick={() => setOpen(true)}
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
  } else {
    return <Spinner />
  }
}

export default Details
