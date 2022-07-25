import React from 'react'
import { useGetHorrorMoviesQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'
import { settings } from '../../../utils/SliderSettings'


const Horror = () => {
  return (
    SliderFetch(useGetHorrorMoviesQuery, {...settings})
  )
}

export default Horror