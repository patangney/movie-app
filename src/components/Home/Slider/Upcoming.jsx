import { useGetUpcomingMoviesQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'

const Comedy = () => {
  return (
    SliderFetch(useGetUpcomingMoviesQuery)
  )
}

export default Comedy