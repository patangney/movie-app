import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import { Header } from './components/index.js'



function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
