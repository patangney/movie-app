import React from 'react'
import { movieAPI } from '../../services/themoviedbAPI'
import { nanoid } from '@reduxjs/toolkit'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import Moment from 'react-moment'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Reviews = () => {
  const params = useParams()
  const {
    data,
    isLoading,
    isFetching,
    isError
  } = movieAPI.endpoints.getReviews.useQuery(params.id)
  let movieReviews = data ? data : {}
  console.log(movieReviews.results, 'movieReviews')

  if (isError) return <div>Error!</div>
  if (isLoading && !data) return <Spinner />

  if (movieReviews.length === 0) {
    return (
      <div className='discover my-5'>
        <h1>No Reviews found</h1>
      </div>
    )
  } else {
    return (
      <div className={isFetching ? <Spinner /> : 'loaded reviews my-5'}>
        <Container>
        {movieReviews.results.map(review => (
            <Row key={nanoid()}>
                <Col xs={12} md={10}>
                    <div className='review'>
                        <h3>Reviewed by {review.author}</h3>
                        <p>{review.content}</p>
                        <p>
                            <Moment format='MMMM Do YYYY'>{review.date}</Moment>
                        </p>
                    </div>
                </Col>
             
              
            </Row>
        ))}
        
       
        </Container>
      </div>
    )
  }
}

export default Reviews
