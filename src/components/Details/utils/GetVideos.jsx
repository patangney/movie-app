import React from 'react'
import { movieAPI } from '../../../services/themoviedbAPI'

export const GetVideos = movieId => {
  const { data = [] } = movieAPI.endpoints.getMovieVideo.useQuery(movieId)
  const getMovieTrailer = data.results ? data.results : []
  console.log(getMovieTrailer)
 
}
