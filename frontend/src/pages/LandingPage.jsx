import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { HowItWorks } from '../components/HowItWorks';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};