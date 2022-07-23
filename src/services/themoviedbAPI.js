import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.REACT_APP_MOVIE_API


// Define a service using a base URL and expected endpoints
export const movieAPI = createApi({
    reducerPath: 'movieAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    tagTypes: ['Movie Details'],
    endpoints: (builder) => ({
      getMovieById: builder.query({
        query: (movieId) => `movie/${movieId}?api_key=${API_KEY}`
      }),
      getDiscoveryMovies: builder.query({
        query: () => `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
      }),
      getReviews: builder.query({
        query: (movieId) => `movie/${movieId}/reviews?api_key=${API_KEY}`
      }),
      getCredits: builder.query({
        query: (movieId) => `movie/${movieId}/credits?api_key=${API_KEY}`
      }),
      getTrendingMovie: builder.query({
        query: () => `trending/movie/day?api_key=${API_KEY}`
      })
    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMovieByIdQuery, useGetDiscoveryMoviesQuery, useGetReviewsQuery, useGetCreditsQuery, useGetTrendingQuery } = movieAPI