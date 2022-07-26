
import Spinner from '../components/Spinner/Spinner'
export const GetMovieDataById = (id, queryApi) => {
    //return the data from the queryApi
    const { data, isLoading, isFetching, isError, isSuccess } = queryApi(id)
    if (isLoading) return <Spinner /> 
    if (isFetching) return <Spinner />
    if (isError) return <div>Error!</div>
    console.log('GetMovieDataById')
    if (isSuccess) return data    
   
}
export const GetMovieData = (queryApi) => {
    //return the data from the queryApi
    const { data, isLoading, isFetching, isError, isSuccess } = queryApi()
    const isLoaded = isLoading || isFetching;
    if (isLoading) return <Spinner /> 
    if (isFetching) return <Spinner />
    if (isError) return <div>Error!</div>
    console.log('GetMovieData')
    if (isSuccess) return data
   
}



