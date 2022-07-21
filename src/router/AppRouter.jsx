import React, { Fragment} from 'react'
import { Routes, Route } from 'react-router-dom'
import {Home} from '../components/index.js'

const AppRouter = () => {
  return (
    <Fragment>
        <Routes>
            <Route path="/" element={<Home />} />

        </Routes>
    </Fragment>
  )
}

export default AppRouter