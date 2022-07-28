import Spinner from '../components/Spinner/Spinner'
// export const GetMovieDataById = (id, queryApi) => {
//     //return the data from the queryApi
//     const { data, isLoading, isFetching, isError, isSuccess } = queryApi(id)
//     if (isLoading) return <Spinner />
//     if (isFetching) return <Spinner />
//     if (isError) return <div>Error!</div>
//     console.log('GetMovieDataById')
//     if (isSuccess) return data

// }
const GetMovieDataById = (id, queryApi) => {
  //return the data from the queryApi
  const { data, isLoading, isFetching, isError, isSuccess, status } = queryApi(
    id
  )

  if (isLoading) return { status }
  console.log(isLoading, 'isLoading', status)
  if (isFetching) return { status }
  console.log(isFetching, 'isFetching', status)
  if (isError) return <div>Error!</div>
  if (isSuccess) return { data, status }
}

export const GenerateDetailsWithId = (id, queryApi) => {
  const { data, status } = GetMovieDataById(id, queryApi)
  console.log(data, status, 'custom hook GenerateDetailsWithId')
  return { data, status }
}
const GetMovieData = queryApi => {
  //return the data from the queryApi
  const { data, isLoading, isFetching, isError, isSuccess, status } = queryApi()
  if (isLoading) return { status }
  console.log(isLoading, 'isLoading', status)
  if (isFetching) return { status }
  console.log(isFetching, 'isFetching', status)
  if (isError) return <div>Error!</div>
  if (isSuccess) return { data, status }
}

export const GenerateMovieData = queryApi => {
  const { data, status } = GetMovieData(queryApi)
  console.log(data, status, 'custom hook GenerateMovieData')
  return { data, status }
}
