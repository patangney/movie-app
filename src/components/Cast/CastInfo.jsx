import React, { Fragment } from 'react'
import { GenerateDetailsWithId } from '../../utils/DataFetch'
import { useGetPeopleDetailsQuery } from '../../services/themoviedbAPI'
import { Chart as ChartJS, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Moment from 'react-moment'
import Biography from './Biography'
import userPlaceholder from '../../assets/placeholder/user.jpg'
import Spinner from '../Spinner/Spinner'

const CastInfo = () => {
  ChartJS.register(ArcElement)
  const params = useParams()
  const { data: person, status } = GenerateDetailsWithId(
    params.id,
    useGetPeopleDetailsQuery
  )

  if (status === 'fulfilled') {
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

    const getAge = (dateToday, dateOfBirth) => {
      const today = new Date(dateToday)
      const birthDate = new Date(dateOfBirth)
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }

    const getBio = bio => {
      if (
        (typeof bio === 'string' && bio.trim().length === 0) ||
        bio === null ||
        bio === undefined
      ) {
        const bioInfo = document.getElementById('readMore')
        console.log(bioInfo, 'bioInfo')
        return 'No Biography Available'
      }

      if (
        typeof bio === 'string' &&
        bio.trim().length > 0 &&
        bio.trim().length < 200
      ) {
        return bio
      } else {
        return <Biography limit={200}>{bio}</Biography>
      }
    }

    const todayDate = new Date()

    const castBio = getBio(person.biography)
    const userAge = getAge(todayDate, person.birthday)
    const userDeathAge = getAge(person.deathday, person.birthday)
    console.log(userDeathAge, 'userDeathAge')

    if (isEmpty) return emptyData()
    else {
      return (
        <Fragment>
          <div className='person ms-5 me-5'>
            <Container fluid className='my-5'>
              <Row className='align-items-start'>
                <Col xs={12} md={2}>
                  <div className='person__image-title'>
                    <img
                      className='mw-90 mh-100 shadow rounded'
                      src={`${poster_url}${person.profile_path}`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = userPlaceholder
                      }}
                    />
                  </div>
                  <div className='person__image-bg'>
                    <img src={`${BACKDROP_url}${person.profile_path}`} alt='' />
                    <div className='person__image-overlay'></div>
                  </div>
                </Col>
                <Col xs={12} md={8}>
                  <Stack direction='horizontal' gap={1}>
                    <h1 className='fs-1'>{person.name}</h1>
                  </Stack>
                  <Stack direction='vertical' gap={1}>
                    {person.birthday !== null &&
                    person.birthday !== undefined ? (
                      <Fragment>
                        {person.deathday === null ||
                        person.deathday === undefined ? (
                          <h5>
                            Age <span className='text-light'>{userAge}</span>
                          </h5>
                        ) : (
                          ''
                        )}

                        <h5>
                          Birthday{' '}
                          <span className='text-light'>
                            <Moment format='MMMM Do, YYYY'>
                              {person.birthday}
                            </Moment>
                          </span>
                        </h5>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span className='text-muted'>Age Not Available</span>
                      </Fragment>
                    )}

                    {person.deathday !== null &&
                    person.deathday !== undefined ? (
                      <Fragment>
                        <h5>
                          Died{' '}
                          <span className='text-light'>
                            <Moment format='MMMM Do, YYYY'>
                              {person.deathday}
                            </Moment>{' '}
                            ({userDeathAge} Years old)
                          </span>
                        </h5>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span className='text-muted'></span>
                      </Fragment>
                    )}

                    {person.place_of_birth !== null &&
                    person.place_of_birth !== undefined ? (
                      <Fragment>
                        <h5>
                          Place of Birth{' '}
                          <span className='text-light'>
                            {person.place_of_birth}
                          </span>
                        </h5>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span className='text-muted'>
                          Place of Birth Not Available
                        </span>
                      </Fragment>
                    )}

                    {person.known_for_department !== null &&
                    person.known_for_department !== undefined ? (
                      <Fragment>
                        <h5>
                          Known For{' '}
                          <span className='text-light'>
                            {person.known_for_department}
                          </span>
                        </h5>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span className='text-muted'>
                          Known For Not Available
                        </span>
                      </Fragment>
                    )}

                    {/* <h5 className='fs-5'>
                
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
                  )} */}
                  </Stack>

                  {/* doughnut chart */}
                  <Container>
                    <Row className='align-items-start'>
                      <Col xs={12} md={3}>
                        <div className='person__controls'>
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
                  {/* biography */}
                  {/* {castBio !== undefined ? <Biography limit={200}>{castBio}</Biography> : 'No Biography Available test'} */}

                  <div id='readMore' className='show'>
                    {castBio}
                  </div>
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
  } else {
    return <Spinner />
  }
}

export default CastInfo
