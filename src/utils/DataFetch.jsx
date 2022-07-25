
import Spinner from '../components/Spinner/Spinner'
export const GetMovieData = (id, queryApi) => {

    //return the data from the queryApi
    const { data, isLoading, isFetching, isError, isSuccess } = queryApi(id)
    if (isLoading && !data) return <Spinner /> 
    if (isFetching) return <Spinner />
    if (isError) return <div>Error!</div>
    if (isSuccess) return data
    return { data }
   
}

