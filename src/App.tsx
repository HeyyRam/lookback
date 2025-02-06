import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } 
    from "react-router-dom";
import Home from './components/home';
import Track from './components/track';
import { Helmet } from 'react-helmet';
import React from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Helmet>
        <title>Track Your Day</title>
    </Helmet>

  <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/track" element={<Track />} />
    </Routes>
   </Router>
     
    </>
  )
}

export default App;
