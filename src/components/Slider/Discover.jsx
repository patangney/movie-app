import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

import { nanoid } from '@reduxjs/toolkit'
import { BACKDROP_url } from '../../api'
import { useGetDiscoveryMoviesQuery } from '../../services/themoviedbAPI'

import Spinner from '../Spinner/Spinner'

// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Discover = () => {
  const { data, isLoading, isFetching, isError } = useGetDiscoveryMoviesQuery()

  if (isError) return <div>Error!</div>
  if (isLoading && !data) return <Spinner />

  let movies = [...data.results]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }

  if (movies.length === 0) {
    return (
      <div className='discover'>
        <h1>No movies found</h1>
      </div>
    )
  } else {
    return (
      <div className={isFetching ? <Spinner /> : 'slider'}>        
        <Slider {...settings}>
          {movies.map(movie => (
            <div className='slider__wrapper' key={nanoid()}>
              <div className='slider__item'>
                <Link className='text-white' to={`/details/${movie.id}`}>
                  <img
                    className='slider__img'
                    src={`${BACKDROP_url}${movie.backdrop_path}`}
                    alt={movie.original_title}
                  />
                  <div className='slider__content'>
                    <h3 className='slider__title'>{movie.original_title}</h3>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

export default Discover
