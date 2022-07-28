import React, { Fragment } from 'react'
import { useGetMovieByIdQuery } from '../../services/themoviedbAPI'
import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { GenerateDetailsWithId } from '../../utils/DataFetch'
import Spinner from '../Spinner/Spinner'

const Collection = () => {
  const params = useParams()
  const img_url = `https://image.tmdb.org/t/p/w1440_and_h320_multi_faces/`

  const { data: getCollection, status } = GenerateDetailsWithId(
    params.id,
    useGetMovieByIdQuery
  )

  if (status === 'fulfilled') {
    let movieCollection = getCollection.belongs_to_collection ? getCollection.belongs_to_collection : {} //If there is no collection, return an empty object 
    const isEmpty = Object.keys(movieCollection).length === 0
    console.log(movieCollection, 'getCollection')

    const emptyCollectionObj = () => {
      return (
        <Fragment>
          <h1 className='mt-5'>No Collection</h1>
          <p>This movie does not belong to a collection</p>
        </Fragment>
      )
    }

    if (isEmpty) return emptyCollectionObj()
    else {
      return (
        <Fragment>
          <div className='loaded reviews my-5'>
            <Container>
              <Row>
                <Col xs={12} md={12}>
                  <Card className='bg-dark text-white'>
                    <Card.Img
                      src={`${img_url}${movieCollection.backdrop_path} || ${img_url}${movieCollection.poster_path}`} //If there is no backdrop_path, use the poster_path
                      alt={movieCollection.name}
                    />
                    <Card.ImgOverlay className='bg-overlay'>
                      <Card.Title>Part of the {movieCollection.name}</Card.Title>
                      <Card.Text>{movieCollection.description}</Card.Text>
                      <Card.Text>
                        <Link to={`/collection/${movieCollection.id}`}>
                          <Button
                            className='text-white'
                            variant='primary'
                            size='lg'
                          >
                            View Collection
                          </Button>
                        </Link>
                      </Card.Text>
                    </Card.ImgOverlay>
                  </Card>
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

export default Collection
