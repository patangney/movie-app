import React, { useState, Fragment } from 'react'
import {
  useGetTvSeriesDetailsQuery,
  useGetMovieVideoQuery
} from '../../services/themoviedbAPI'
import { Chart as ChartJS, ArcElement } from 'chart.js'
import { GenerateDetailsWithId } from '../../utils/DataFetch'
import { nanoid } from '@reduxjs/toolkit'
import { Doughnut } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import CurrencyFormat from 'react-currency-format'
import Moment from 'react-moment'
import Spinner from '../Spinner/Spinner'
import ModalVideo from 'react-modal-video'

const SeriesDetails = () => {
  ChartJS.register(ArcElement)
  const params = useParams()
  const [isOpen, setOpen] = useState(false)
  const { data: tvSeries, status: tvStatus } = GenerateDetailsWithId(
    params.id,
    useGetTvSeriesDetailsQuery
  )

  const BACKDROP_url =
    'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
  const poster_url = 'https://image.tmdb.org/t/p/w500'

  if (tvStatus === 'fulfilled') {
    const releaseDate = tvSeries.first_air_date
    const lastDate = tvSeries.last_air_date
    return (
      <Fragment>
        <div className='details ms-5 me-5'>
          <Container fluid className='my-5'>
            <Row>
            <Col xs={12} md={2}>
              <div className='details__image-title'>
                <img
                  className='shadow rounded'
                  src={`${poster_url}${tvSeries.poster_path}`}
                  alt=''
                />
              </div>
              <div className='details__image-bg'>
                <img src={`${BACKDROP_url}${tvSeries.backdrop_path}`} alt='' />
                <div className='details__image-overlay'></div>
              </div>
            </Col>

            <Col xs={12} md={8}>
              <h1 className='fs-1'>{tvSeries.original_name}</h1>
              <h3 className='fs-5 '>"{tvSeries.tagline}"</h3>

              <h5>
                First Aired:{' '}
                <Moment format='MMMM Do YYYY'>{releaseDate}</Moment>
              </h5>
              <h5>
                Last Aired:{' '}
                <Moment format='MMMM Do YYYY'>{lastDate}</Moment>
              </h5>
              <h5>
                Status:
                <span className={`my-1 ms-2 me-1 badge text-dark ` + (tvSeries.status==='Ended' ? "bg-info" : "bg-success")}>{tvSeries.status}</span>
              </h5>

              <h5>
                Genre
                {tvSeries.genres
                  ? tvSeries.genres.map(genre => (
                      <span
                        key={nanoid()}
                        className='my-1 ms-2 me-1 badge bg-warning text-dark'
                      >
                        {genre.name}
                      </span>
                    ))
                  : null}
              </h5>
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

export default SeriesDetails
