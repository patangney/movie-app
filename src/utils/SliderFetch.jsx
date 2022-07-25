import React, { Fragment } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import userPlaceholder from '../assets/placeholder/moviePlaceholder.png'
import { GetMovieData } from './DataFetch'

const SliderFetch = (queryApi, sliderSetting) => {
  const data = GetMovieData(queryApi)
  const sliderData = data.results ? data.results : []
  const isEmpty = Object.keys(sliderData).length === 0
  
  const BACKDROP_url = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'

  const emptyData = () => {
    return (
      <Fragment>
        <p>No Data</p>
      </Fragment>
    )
  }

  if (isEmpty) return emptyData()

  return (
    <Fragment>
      <Fragment>
        <Slider {...sliderSetting} className='my-5'>
          {sliderData.map(sliderInfo => (
            <div className='slider__wrapper' key={nanoid()}>
              <div className='slider__item'>
                <Link className='text-white' to={`/details/${sliderInfo.id}`}>
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
                </Link>

                <h5 className='slider__title--box'>
                  {sliderInfo.title || sliderInfo.name}
                </h5>
              </div>
            </div>
          ))}
        </Slider>
      </Fragment>
    </Fragment>
  )
}

export default SliderFetch


