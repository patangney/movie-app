import { useGetActionMoviesQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'
import { settings } from '../../../utils/SliderSettings'

const Action = () => {
  return (
    SliderFetch(useGetActionMoviesQuery, {...settings})
  )
}

export default Action