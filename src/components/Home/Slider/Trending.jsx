import { useGetDiscoveryMoviesQuery } from '../../../services/themoviedbAPI'
import  SliderFetch from '../../../utils/SliderFetch'


const Trending = () => {
  return (
    SliderFetch(useGetDiscoveryMoviesQuery)
  )
}

export default Trending