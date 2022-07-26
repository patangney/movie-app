import React from 'react'
import { movieAPI } from '../../services/themoviedbAPI'
import { nanoid } from '@reduxjs/toolkit'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import Slider from 'react-slick'
import Container from 'react-bootstrap/Container'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import userPlaceholder from '../../assets/placeholder/user.jpg'

const Cast = () => {
  const params = useParams()
  const {
    data,
    isLoading,
    isFetching,
    isError
  } = movieAPI.endpoints.getCredits.useQuery(params.id)
  let castCredits = data ? data : {}

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8 ,
    slidesToScroll: 8,
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
      <div className="cast">
        <Slider {...settings} className=''>
        {castCredits.cast.map(cast => (
          <div className='slider__wrapper castImage' key={nanoid()}>
            <div className='slider__item'>
              <Link className='text-white' to={`/person/${cast.id}`}>
                <img
                  style={{ minHeight: 200 }}
                  className='slider__img hoverEffect'
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src = userPlaceholder
                  }}
                  alt={cast.name}
                />
              </Link>
              <h5 className='slider__title--name'>
                  {cast.name}
                </h5>
            </div>
          </div>
        ))}
      </Slider>

      </div>
      
    )
  }
}

export default Cast
