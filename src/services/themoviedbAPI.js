import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.REACT_APP_MOVIE_API

///movie/upcoming?api_key=<<api_key>>&language=en-US&page=1

// Define a service using a base URL and expected endpoints
export const movieAPI = createApi({
  reducerPath: 'movieAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  tagTypes: ['Movie Details'],
  endpoints: builder => ({
    getMovieById: builder.query({
      query: movieId => `movie/${movieId}?api_key=${API_KEY}`
    }),
    getDiscoveryMovies: builder.query({
      query: () =>
        `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate`
    }),
    getReviews: builder.query({
      query: movieId => `movie/${movieId}/reviews?api_key=${API_KEY}`
    }),
    getCredits: builder.query({
      query: movieId => `movie/${movieId}/credits?api_key=${API_KEY}`
    }),
    getTrendingMovie: builder.query({
      query: () => `trending/movie/day?api_key=${API_KEY}`
    }),
    getSimilarMovie: builder.query({
      query: movieId => `movie/${movieId}/similar?api_key=${API_KEY}`
    }),
    getActionMovies: builder.query({
      query: () =>
        `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=28&with_watch_providers=337`
    }),
    getComedyMovies: builder.query({
      query: () =>
        `discover/movie?api_key=${API_KEY}&with_genres=35&with_watch_providers=337`
    }),
    getUpcomingMovies: builder.query({
      query: () => `movie/upcoming?api_key=${API_KEY}&language=en-US`
    }),
    getMovieVideo: builder.query({
      query: movieId =>
        `movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    }),
    getHorrorMovies: builder.query({
      query: () =>
        `discover/movie?api_key=${API_KEY}&with_genres=27&with_watch_providers=337`
    }),
    getAnimationMovies: builder.query({
      query: () =>
        `discover/movie?api_key=${API_KEY}&with_genres=16&with_watch_providers=337`
    }),
    getPeopleDetails: builder.query({
      query: (personId) =>
        `person/${personId}?api_key=${API_KEY}&language=en-US`
    }),
    getNetworkTv: builder.query({
      query: (networkId) =>
        `discover/tv/?api_key=${API_KEY}&language=en-US&with_networks=${networkId}&sort_by=popularity.desc&page=1`
    }),
    getCompanyTvSeries: builder.query({
      query: (companyId) =>
        `discover/tv/?api_key=${API_KEY}&language=en-US&with_companies=${companyId}&sort_by=popularity.desc&page=1`
    }),
    getTvSeriesDetails: builder.query({
      query: (tvSeriesId) =>
        `tv/${tvSeriesId}?api_key=${API_KEY}&language=en-US`
    }),
    getStarWarsTv: builder.query({
      query: () =>
        `search/tv?query=star%20wars?api_key=${API_KEY}&language=en-US`
    }),
    
  })
})

// Export hooks for usage in functional components, which are
//https://api.themoviedb.org/3/movie/438148/similar?api_key=f13e36f04ee1a763624cfc19b4c52584
// auto-generated based on the defined endpoints
export const {
  useGetMovieByIdQuery,
  useGetActionMoviesQuery,
  useGetDiscoveryMoviesQuery,
  useGetReviewsQuery,
  useGetCreditsQuery,
  useGetTrendingMovieQuery,
  useGetSimilarMovieQuery,
  useGetMovieVideoQuery,
  useGetComedyMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetHorrorMoviesQuery,
  useGetAnimationMoviesQuery,
  useGetPeopleDetailsQuery,
  useGetNetworkTvQuery,
  useGetTvSeriesDetailsQuery,
  useGetCompanyTvSeriesQuery,
  useGetStarWarsTvQuery
} = movieAPI
