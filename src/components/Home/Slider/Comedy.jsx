import { useGetTrendingMovieQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'
import { settings } from '../../../utils/SliderSettings'

const Comedy = () => {
  return (
    SliderFetch(useGetTrendingMovieQuery, {...settings})
  )
}

export default Comedy