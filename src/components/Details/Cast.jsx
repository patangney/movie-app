import React from 'react'
import { movieAPI } from '../../services/themoviedbAPI'
import { nanoid } from '@reduxjs/toolkit'
import { useParams, Link } from 'react-router-dom'
import { useGetCreditsQuery } from '../../services/themoviedbAPI'
import { GenerateDetailsWithId } from '../../utils/DataFetch'
import Spinner from '../Spinner/Spinner'
import Slider from 'react-slick'
import Container from 'react-bootstrap/Container'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import userPlaceholder from '../../assets/placeholder/user.jpg'

import { castSettings } from '../../utils/SliderSettings'



const Cast = () => {
  const params = useParams()
  const { data: castInfo, status } = GenerateDetailsWithId(
    params.id,
    useGetCreditsQuery
  )
  console.log(castInfo, status, 'cast information')

  if (status === 'fulfilled') {

  const isEmpty = Object.keys(castInfo.cast).length === 0
  const checkCount = Object.keys(castInfo.cast).length
  
  if (checkCount <= 9) {
    console.log(checkCount, 'check count')
    castSettings.slidesToShow = 4
    castSettings.slidesToScroll = 4
  } else {
    console.log(checkCount, 'check count')
    castSettings.slidesToShow = 10
    castSettings.slidesToScroll = 10
  }
    return (
      <div className='cast'>
        <Slider {...castSettings} className=''>
          {castInfo.cast.map(cast => (
            <div className='slider__wrapper castImage' key={nanoid()}>
              <div className='slider__item'>
                <Link className='text-white' to={`/person/${cast.id}`}>
                  <img
                    style={{minHeight: 200}}
                    className='slider__img hoverEffect'
                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null // prevents looping
                      currentTarget.src = userPlaceholder
                    }}
                    alt={cast.name}
                  />
                </Link>
                <h5 className='slider__title--name'>{cast.name}</h5>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default Cast
