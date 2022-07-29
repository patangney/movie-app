import React, { Fragment} from 'react'
import { Routes, Route } from 'react-router-dom'
import {Home, Details, CollectionDetails, CastInfo, ViewNetwork} from '../components/index.js'

const AppRouter = () => {
  return (
    <Fragment>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/collection/:id" element={<CollectionDetails />} />
            <Route path="/person/:id" element={<CastInfo />} />
            <Route path="/network/:id" element={<ViewNetwork />} />

        </Routes>
    </Fragment>
  )
}

export default AppRouter