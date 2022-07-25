import { useGetSimilarMovieQuery } from '../../services/themoviedbAPI'
import  SliderFetchWithId from '../../utils/SliderFetchWithId'
import { settings } from '../../utils/SliderSettings'
import { useParams } from 'react-router-dom'


const SimilarMovies = () => {
  const params = useParams()
  return (
    SliderFetchWithId((params.id),useGetSimilarMovieQuery, {...settings})
  )
}

export default SimilarMovies