import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { movieAPI } from '../../services/themoviedbAPI'
import { nanoid } from '@reduxjs/toolkit'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import userPlaceholder from '../../assets/placeholder/user.jpg'

export const Sonnet = () => {
  return (
    <div>
      <h1>todo</h1>
    </div>
  )
}

const TavNavigation = () => {
  const params = useParams()
  const {
    data,
    isLoading,
    isFetching,
    isError
  } = movieAPI.endpoints.getCredits.useQuery(params.id)
  let castCredits = data ? data : {}
  console.log(castCredits.cast, 'castCredits.cast')

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  if (isError) return <div>Error!</div>
  if (isLoading && !data) return <Spinner />

  if (castCredits.length === 0) {
    return (
      <div className='discover'>
        <h1>No Cast found</h1>
      </div>
    )
  } else {
    return (
      <Tabs
        defaultActiveKey='cast'
        id='justify'
        className='bottom-border mb-3 my-5'
      >
        <Tab eventKey='cast' title='Cast'>
          <Slider {...settings} className='my-5'>
            {castCredits.cast.map(cast => (
              <div className='slider__wrapper' key={nanoid()}>
                <div className='slider__item'>
                  <Link className='text-white' to={`/cast/${cast.id}`}>
                    <img
                      style={{ minHeight: 200 }}
                      className='slider__img'
                      src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = userPlaceholder
                      }}
                      alt={cast.name}
                    />
                  </Link>
                  <div className='slider__content'>
                    <h5 className='slider__title slider__title--name'>
                      {cast.name}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </Tab>
        <Tab eventKey='reviews' title='Reviews'>
          <Sonnet />
        </Tab>
        <Tab eventKey='suggestions' title='Suggestions'>
          <Sonnet />
        </Tab>
        <Tab eventKey='collection' title='Collection'>
          <Sonnet />
        </Tab>
      </Tabs>
    )
  }
}

export default TavNavigation
