import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
