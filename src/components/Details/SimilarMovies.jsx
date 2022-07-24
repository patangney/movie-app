import React from 'react'
import { movieAPI } from '../../services/themoviedbAPI'
import { nanoid } from '@reduxjs/toolkit'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import userPlaceholder from '../../assets/placeholder/moviePlaceholder.png'

const SimilarMovies = () => {
  const params = useParams()
  const BACKDROP_url =
    'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
  const {
    data,
    isLoading,
    isFetching,
    isError
  } = movieAPI.endpoints.getSimilarMovie.useQuery(params.id)
  let responseData = data ? data : {}

  //Place these checks here so that the data can load properly otherwise the data will be undefined
  if (isError) return <div>Error!</div>
  if (isLoading && !data) return <Spinner />

  console.log(responseData, 'similarMovies')

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
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

  if (responseData.results.length === 0) {
    return (
      <div className='discover my-5'>
        <h1>Trending Not Found</h1>
      </div>
    )
  } else {
    return (
      <Slider {...settings} className='my-5'>
        {responseData.results.map(similar => (
          <div className='slider__wrapper' key={nanoid()}>
            <div className='slider__item'>
              <Link className='text-white' to={`/details/${similar.id}`}>
                <img
                  style={{ minHeight: 200 }}
                  className='slider__img hoverEffect slider__title--box'
                  src={`${BACKDROP_url}${similar.backdrop_path}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src = userPlaceholder
                  }}
                  alt={similar.title}
                />
                  <h5 className='slider__title--box'>
                    {similar.title || similar.name}
                  </h5>
                
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    )
  }
}

export default SimilarMovies
