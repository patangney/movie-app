import { useGetAnimationMoviesQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'
import { settings } from '../../../utils/SliderSettings'

const Animation = () => {
  return (
    SliderFetch(useGetAnimationMoviesQuery, {...settings})
  )
}

export default Animation