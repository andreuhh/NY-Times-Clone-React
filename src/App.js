import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';

import Home from './pages/Home/Home';
import Articles from './pages/Articles/Articles';
import Header from './Components/Header';
import Footer from './Components/Footer';

import './App.scss'

const App = () => {

  return (
    <>

      <BrowserRouter>
          <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/articles/:id' element={<Articles/>} />
        </Routes>
          <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
