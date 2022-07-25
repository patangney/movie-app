import React, { Fragment } from 'react'
import { useGetMovieByIdQuery } from '../../services/themoviedbAPI'
import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { GetMovieDataById } from '../../utils/DataFetch'

const Collection = () => {
  const params = useParams()
  const img_url = `https://image.tmdb.org/t/p/w1440_and_h320_multi_faces/`
  
  const dataInfo = GetMovieDataById(params.id, useGetMovieByIdQuery)
  let getCollection = dataInfo.belongs_to_collection ? dataInfo.belongs_to_collection : {}
  const isEmpty = Object.keys(getCollection).length === 0  

  const emptyCollection = () => {
    return (
      <Fragment>
        <h1 className='mt-5'>No Collection</h1>
        <p>This movie does not belong to a collection</p>
      </Fragment>
    )
  }

  if (isEmpty) return emptyCollection()
  else {
    return (
      <Fragment>        
          <div className='loaded reviews my-5'>
            <Container>
              <Row>
                <Col xs={12} md={12}>
                  <Card className='bg-dark text-white'>
                    <Card.Img
                      src={`${img_url}${getCollection.backdrop_path}`}
                      alt={getCollection.name}
                    />
                    <Card.ImgOverlay className='bg-overlay'>
                      <Card.Title>Part of the {getCollection.name}</Card.Title>
                      <Card.Text>{getCollection.description}</Card.Text>
                      <Card.Text>
                        <Link to={`/collection/${getCollection.id}`}>
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
}

export default Collection
