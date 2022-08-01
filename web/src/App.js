import './App.css';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import React from 'react';
import Seller from './Seller';
import Nav from './components/Navbar';
import Homepage from './components/Homepage';
import Products from './Products';
import Thanks from './Thanks'
function App() {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/products/:id" element={<Products/>} />
        <Route path="/seller" element={<Seller/>} />
        <Route path="/thanks" element={<Thanks/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
