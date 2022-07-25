import { useGetTrendingMovieQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'

const Comedy = () => {
  return (
    SliderFetch(useGetTrendingMovieQuery)
  )
}

export default Comedy