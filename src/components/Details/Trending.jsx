import React from 'react'
import { movieAPI } from '../../services/themoviedbAPI'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import userPlaceholder from '../../assets/placeholder/moviePlaceholder.png'

const Trending = () => {
  const BACKDROP_url =
    'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
    const {
      data,
      isLoading,
      isFetching,
      isError
    } = movieAPI.endpoints.getTrendingMovie.useQuery()
    let trendingNow = data ? data : {}
    
    //Place these checks here so that the data can load properly otherwise the data will be undefined
    if (isError) return <div>Error!</div>
    if (isLoading && !data) return <Spinner />
    
    console.log(trendingNow, 'trendingNow')

    const topTenTrending = trendingNow.results.slice(0, 10)
    console.log(topTenTrending, 'topTenTrending')

  

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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

  
  if (trendingNow.results.length === 0) {
    return (
      <div className='discover my-5'>
        <h1>Trending Not Found</h1>
      </div>
    )
  } else {
    return (
      <Slider {...settings} className='my-5'>
        {topTenTrending.map(trending => (
          <div className='slider__wrapper' key={nanoid()}>
            <div className='slider__item'>
              <Link className='text-white' to={`/details/${trending.id}`}>
                <img
                  style={{ minHeight: 200 }}
                  className='slider__img hoverEffect'
                  src={`${BACKDROP_url}${trending.backdrop_path}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src = userPlaceholder
                  }}
                  alt={trending.title}
                />
              </Link>
             
                <h5 className='slider__title--box'>
                  {trending.title || trending.name}
                </h5>
         
            </div>
          </div>
        ))}
      </Slider>
    )
  }
}

export default Trending
