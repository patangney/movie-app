import React, { useEffect } from 'react'
import { useGetMovieByIdQuery, movieAPI } from '../../services/themoviedbAPI'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import TavNavigation from './TavNavigation'
import Spinner from '../Spinner/Spinner'
ChartJS.register(ArcElement, Tooltip, Legend)

const Details = () => {
  const params = useParams()
  console.log(params, 'params')
  const { data, isLoading, isFetching, isError } = useGetMovieByIdQuery(
    params.id
  )
  console.log(data, 'data from useGetMovieByIdQuery ')

  let movie = data ? data : {}

  const isEmpty = Object.keys(movie).length === 0

  const BACKDROP_url =
    'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
  const poster_url = 'https://image.tmdb.org/t/p/w500'

  const getReviews = movieAPI.endpoints.getReviews.useQuery(params.id)
  console.log(getReviews, 'getReviews')

  if (isError) return <div>Error!</div>
  if (isLoading && !data) return <Spinner />

  const userRatingAbs = Math.round(
    Math.abs(movie.vote_average, 10 - movie.vote_average)
  )
  console.log(userRatingAbs, 'userRatingAbs')

  // Convert Date object to string
  const movieDate = movie.release_date
  console.log(movieDate, 'movieDate')
  const parts = movieDate.split('-')
  const mydate = new Date(parts[0], parts[1] - 1, parts[2])
  const movieDateString = mydate.toDateString()

  const userRating = {
    datasets: [
      {
        data: [movie.vote_average, 10 - movie.vote_average],

        backgroundColor: ['#9BC53D', 'rgba(0, 0, 0, 0.1)'],
        borderColor: ['#9BC53D', 'rgba(0, 0, 0, 0.2)'],
        borderWidth: 0.5
      }
    ]
  }

  if (isEmpty) {
    return (
      <div className='details'>
        <h1>No movie found</h1>
      </div>
    )
  } else {
    return (
      <div className={isFetching ? <Spinner /> : 'loaded'}>
        <div className='details'>
          <div className='container my-5'>
            <div className='row align-items-start'>
              <div className='col-md-6'>
                <div className='details__image-title'>
                  <img src={`${poster_url}${movie.poster_path}`} alt='' />
                </div>
                <div className='details__image-bg'>
                  <img src={`${BACKDROP_url}${movie.backdrop_path}`} alt='' />
                  <div className='details__image-overlay'></div>
                </div>
              </div>
              <div className='col'>
                <h1 className='data-title'>{movie.original_title}</h1>
                <h3 className='data-title'>{movie.tagline}</h3>
                <div className='details__info'>
                  <div className='details__info-item'>
                    <h5 className='details__info-title'>
                      Release date: {movieDateString}
                    </h5>
                  </div>
                  <div className='details__info-item'>
                    <h3 className='details__info-title'>Genre:</h3>
                    <p
                      className={
                        isFetching ? <Spinner /> : 'details__info-text'
                      }
                    >
                      {movie.genres.map(genre => genre.name).join(', ')}
                    </p>
                    {/* doughnut chart */}
                    <div className='consensus'>
                      <div className='consensus__outer_ring'>
                        <div className='consensus__user_score_chart'>
                          <Doughnut data={userRating} />
                          <div className='consensus__percent'>
                            Rating {userRatingAbs}{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* container-fluid */}
          </div>
          <div className='container'>
            <div className='row row justify-content-start'>
              <div className='col-md-8'>
                <p className={isFetching ? <Spinner /> : 'details__info--text'}>
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='navigation'>
          <div className='container'>
            <div className='row justify-content-start'>
              <div className='col'>
                <TavNavigation />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Details
