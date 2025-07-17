import React from 'react';
import { Link } from 'react-router-dom'; 
export const Hero = () => {
  return (
    <section className="hero-bg text-white">
      <div className="container mx-auto px-6 py-24 md:py-32 text-center md:text-left">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            PetConnect
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-200 mb-8">
            A ponte entre quem ama cuidar e quem ama ser cuidado.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/cadastro" className="px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg">
            Encontrar um Cuidador
          </Link>
          <Link to="/cadastro" className="px-8 py-3 text-lg font-semibold text-gray-800 bg-white rounded-lg hover:bg-gray-200 transition-colors shadow-lg">
            Oferecer Meus Serviços
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};