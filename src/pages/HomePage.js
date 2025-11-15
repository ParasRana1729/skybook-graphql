import React from 'react';
import Hero from '../components/Hero';
import SearchFlights from '../components/SearchFlights';
import About from '../components/About';
import Fleet from '../components/Fleet';

const HomePage = () => {
  return (
    <>
      <Hero />
      <SearchFlights />
      <About />
      <Fleet />
    </>
  );
};

export default HomePage;

