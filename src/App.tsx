import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Footer from './components/Footer';
import CompletedAnime from './pages/CompletedAnime';
import AMVComp from './assets/amv_comp.mp4';

function App() {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />

        <video autoPlay muted loop id='video'>
          <source src={AMVComp} type='video/mp4'></source>
        </video>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/completed' element={<CompletedAnime />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
