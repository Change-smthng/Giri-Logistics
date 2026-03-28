import React, { useEffect } from 'react';
import { API } from '../config';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    fetch(`${API}/api/public/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {
      // no-op
    });
  }, []);

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
