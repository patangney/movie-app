import React, { Fragment } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import userPlaceholder from '../assets/placeholder/moviePlaceholder.png'
import { GenerateMovieData } from './DataFetch'
import Spinner from '../components/Spinner/Spinner'

const SliderFetch = (queryApi, sliderSetting) => {
  const { data, status } = GenerateMovieData(queryApi)
  console.log(data, status, 'custom hook slider fetch')

  if (status === 'fulfilled') {
    const isEmpty = Object.keys(data).length === 0
   

    const BACKDROP_url =
      'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'

    const emptyData = () => {
      return (
        <Fragment>
          <p>No Data</p>
        </Fragment>
      )
    }

    if (isEmpty) return emptyData()
    else {
      return (
        <Fragment>
          <Fragment>
            <Slider {...sliderSetting} className='my-5'>
              {data.results.map(sliderInfo => (
                <div className='slider__wrapper' key={nanoid()}>
                  <div className='slider__item'>
                    <Link
                      className='text-white'
                      to={`/details/${sliderInfo.id}`}
                    >
                      <img
                        style={{ minHeight: 200 }}
                        className='slider__img hoverEffect'
                        src={`${BACKDROP_url}${sliderInfo.backdrop_path}`}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null // prevents looping
                          currentTarget.src = userPlaceholder
                        }}
                        alt={sliderInfo.title}
                      />
                      <h5 className='slider__title--box'>
                      {sliderInfo.title || sliderInfo.name}
                    </h5>
                    </Link>

                    
                  </div>
                </div>
              ))}
            </Slider>
          </Fragment>
        </Fragment>
      )
    }
  } else {
    return <Spinner />
  }
}

export default SliderFetch
