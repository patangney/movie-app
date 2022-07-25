import { useGetDiscoveryMoviesQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'
import { settings } from '../../../utils/SliderSettings'


const Trending = () => {
  return (
    SliderFetch(useGetDiscoveryMoviesQuery, {...settings})
  )
}

export default Trending