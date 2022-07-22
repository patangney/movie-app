import React, {useEffect} from 'react'
import {useGetMovieByIdQuery, movieAPI } from '../../services/themoviedbAPI'

import { useParams } from 'react-router-dom'
  import Spinner from '../Spinner/Spinner'





const Details = () => {
    const params = useParams()
    console.log(params, 'params')
    const { data = [], isLoading, isFetching, isError } = useGetMovieByIdQuery(params.id)

    const getReviews = movieAPI.endpoints.getReviews.useQuery(params.id)
    console.log(getReviews, 'getReviews')
    
    if (isError) return <div>Error!</div>
    if (isLoading && !data) return <Spinner />

  

    
    return (
        <div className={isFetching ? <Spinner /> : 'loaded'}>
            <h1>{data.title}</h1>
        
        

        
     
    </div>
      )

}

export default Details