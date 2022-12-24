import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Homepage from './pages/Homepage';
import Cards from './pages/Cards';
import About from './pages/About';
import Createyourcard from './pages/Createyourcard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar />
  <Routes>
<Route path="/" element={<Homepage />} />
<Route path="Cards" element={<Cards/>} />
<Route path="About" element={<About />} />
<Route path="Createyourcard" element={<Createyourcard/>}/>
</Routes>

  </BrowserRouter>
);
