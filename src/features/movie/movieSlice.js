import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    discoveryMovies: []
}

console.log(initialState, 'initialState')

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setDiscovery: (state, action) => {
            state.discoveryMovies.push(action.payload)
        }
    }
})
export const { setDiscovery } = movieSlice.actions;
export const selectDiscoverMovies = state => state.movie.discoveryMovies;

export default movieSlice.reducer; 

