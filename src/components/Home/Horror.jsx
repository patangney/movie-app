import React from 'react'
import { useGetDiscoveryMoviesQuery } from '../../services/themoviedbAPI'
import  SliderFetch from '../../utils/SliderFetch'


const Horror = () => {
  return (
    SliderFetch(useGetDiscoveryMoviesQuery)
  )
}

export default Horror