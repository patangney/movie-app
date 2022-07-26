import React, { useState, Fragment } from 'react'
import { GetMovieDataById } from '../../utils/DataFetch'
import { useGetPeopleDetailsQuery } from '../../services/themoviedbAPI'
import { Chart as ChartJS, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { nanoid } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Moment from 'react-moment'

const CastInfo = () => {
  ChartJS.register(ArcElement)
  const params = useParams()
  const data = GetMovieDataById(params.id, useGetPeopleDetailsQuery)
  const person = data ? data : []
  console.log(person, 'person')

  const isEmpty = Object.keys(person).length === 0

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

  const userPopularity = {
    datasets: [
      {
        data: [person.popularity, 100 - person.popularity],
        backgroundColor: ['#9BC53D', 'rgba(0, 0, 0, 0.1)'],
        borderColor: ['#9BC53D', 'rgba(0, 0, 0, 0.2)'],
        borderWidth: 0.5
      }
    ]
  }

  const userPopularityAbs = Math.round(Math.abs(person.popularity))

  const getAge = date => {
    const today = new Date()
    const birthDate = new Date(date)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const userAge = getAge(person.birthday)
  console.log(userAge, 'userAge')

  if (isEmpty) return emptyData()
  else {
    return (
      <Fragment>
        <div className='details ms-5 me-5'>
          <Container fluid className='my-5'>
            <Row className='align-items-start'>
              <Col xs={12} md={2}>
                <div className='details__image-title'>
                  <img
                    className='shadow rounded'
                    src={`${poster_url}${person.profile_path}`}
                    alt=''
                  />
                </div>
                <div className='details__image-bg'>
                  <img src={`${BACKDROP_url}${person.profile_path}`} alt='' />
                  <div className='details__image-overlay'></div>
                </div>
              </Col>
              <Col xs={12} md={8}>
                <Stack direction='horizontal' gap={1}>
                  <h1 className='fs-1'>{person.name}</h1>
                </Stack>
                <Stack direction='horizontal' gap={1}>
                  <h5 className='fs-5'>
                    {' '}
                    Born:{' '}
                    <span className='m-1'>
                      <Moment format='DD MMM YYYY'>{person.birthday}</Moment>
                    </span>{' '}
                  </h5>
                  {person.deathday !== null ? (
                    <h5 className='fs-5'>
                      Died:{' '}
                      <Moment format='DD MMM YYYY'>{person.deathday}</Moment>
                    </h5>
                  ) : (
                    <h5>({userAge} Years Old)</h5>
                  )}
                </Stack>

                <Stack direction='horizontal' gap={1}>
                  <h5 className='fs-5 '>
                    Place of Birth: {person.place_of_birth}
                  </h5>
                </Stack>
                <Stack direction='horizontal' gap={1}>
                  <h5 className='fs-5'>
                    Known for:{' '}
                    <span className='fs-5'>{person.known_for_department}</span>
                  </h5>
                </Stack>

                {/* doughnut chart */}
                <Container>
                  <Row className='align-items-start'>
                    <Col xs={12} md={3}>
                      <div className='details__controls'>
                        <Stack direction='horizontal' gap={2}>
                          <div className='consensus'>
                            <div className='consensus__outer_ring'>
                              <Doughnut data={userPopularity} />
                            </div>
                          </div>
                        </Stack>
                        <Stack direction='horizontal' gap={2}>
                          Popularity {userPopularityAbs}
                        </Stack>
                      </div>
                    </Col>
                    <Col xs={12} md={3}></Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row>
              <Col xs={12} md={8}>
                <p className='details__info--text'>{person.biography}</p>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='navigation ms-5 me-5'>
          <Container fluid>
            <Row>
              <Col xs={12} md={12}>
                {/* <TavNavigation /> */}
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    )
  }
}

export default CastInfo
