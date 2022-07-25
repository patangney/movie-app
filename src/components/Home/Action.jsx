import { useGetActionMoviesQuery } from '../../services/themoviedbAPI'
import  SliderFetch from '../../utils/SliderFetch'

const Action = () => {
  return (
    SliderFetch(useGetActionMoviesQuery)
  )
}

export default Action