import React, { Fragment } from 'react'
import { movieAPI } from '../../services/themoviedbAPI'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import userPlaceholder from '../../assets/placeholder/moviePlaceholder.png'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  autoplay: false,
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

const Action = () => {
  const BACKDROP_url =
    'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'

  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    isSuccess
  } = movieAPI.endpoints.getActionMovies.useQuery()

  const actionNow = data.results ? data.results : []
  const isEmpty = Object.keys(actionNow).length === 0

  return (
    <Fragment>
      {isLoading && <Spinner />}
      {isFetching && <Spinner />}
      {isError && <h2>Something went wrong</h2>}
      {isSuccess && (
        <Fragment>
          <Slider {...settings} className='my-5'>
            {actionNow.map(actionMovies => (
              <div className='slider__wrapper' key={nanoid()}>
                <div className='slider__item'>
                  <Link
                    className='text-white'
                    to={`/details/${actionMovies.id}`}
                  >
                    <img
                      style={{ minHeight: 200 }}
                      className='slider__img hoverEffect'
                      src={`${BACKDROP_url}${actionMovies.backdrop_path}`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = userPlaceholder
                      }}
                      alt={actionMovies.title}
                    />
                  </Link>

                  <h5 className='slider__title--box'>
                    {actionMovies.title || actionMovies.name}
                  </h5>
                </div>
              </div>
            ))}
          </Slider>
        </Fragment>
      )}
      {isEmpty && <h2>No Action Movies</h2>}
    </Fragment>
  )
}

export default Action
