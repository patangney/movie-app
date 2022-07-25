import { useGetUpcomingMoviesQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'
import { settings } from '../../../utils/SliderSettings'

const Comedy = () => {
  return (
    SliderFetch(useGetUpcomingMoviesQuery, {...settings})
  )
}

export default Comedy