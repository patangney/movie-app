import React, { Fragment} from 'react'
import { Routes, Route } from 'react-router-dom'
import {Home, Details, CollectionDetails, CastInfo, ViewNetworkTV, SeriesDetails, CompanyTvSeries} from '../components/index.js'

const AppRouter = () => {
  return (
    <Fragment>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/collection/:id" element={<CollectionDetails />} />
            <Route path="/person/:id" element={<CastInfo />} />
            <Route path="/network/:id" element={<ViewNetworkTV />} />
            <Route path="/tv/:id" element={<SeriesDetails />} />
            <Route path="/company/:id" element={<CompanyTvSeries />} />

        </Routes>
    </Fragment>
  )
}

export default AppRouter