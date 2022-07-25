import { useGetAnimationMoviesQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'

const Animation = () => {
  return (
    SliderFetch(useGetAnimationMoviesQuery)
  )
}

export default Animation