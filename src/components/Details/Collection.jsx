import React from 'react'
import { useGetMovieByIdQuery, movieAPI } from '../../services/themoviedbAPI'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Collection = () => {
  const params = useParams()  
  const { data, isLoading, isFetching, isError } = useGetMovieByIdQuery(
    params.id
  )

  let getCollection = data.belongs_to_collection
    ? data.belongs_to_collection
    : {}

  

  const img_url = `https://image.tmdb.org/t/p/w1440_and_h320_multi_faces/`

  if (isError) return <div>Error!</div>
  if (isLoading && !data) return <Spinner />

  const isEmpty = Object.keys(getCollection).length === 0;

  if (isEmpty) {
    return (
      <div className='discover my-5'>
        <h1>No Collections found</h1>
      </div>
    )
  } else {
    return (
      <div className={isFetching ? <Spinner /> : 'loaded reviews my-5'}>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <Card className='bg-dark text-white'>
                <Card.Img src={`${img_url}${getCollection.backdrop_path}`} alt={getCollection.name} />
                <Card.ImgOverlay className='bg-overlay'>
                  <Card.Title>Part of the {getCollection.name}</Card.Title>
                  <Card.Text>
                  {getCollection.description}
                  </Card.Text>
                  <Card.Text><Link to={`/collection/${getCollection.id}`}>
                  <Button className='text-white' variant='primary' size="lg">View Collection</Button>
                </Link></Card.Text>
                </Card.ImgOverlay>
              </Card>
             
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Collection
