import React from 'react'
import { useGetHorrorMoviesQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'


const Horror = () => {
  return (
    SliderFetch(useGetHorrorMoviesQuery)
  )
}

export default Horror