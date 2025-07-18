import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

export const Hero = () => {
  // Pega o token e o usuário do nosso estado global
  const { token, user } = useContext(AuthContext);

  // Define os destinos dos links com base no status de login e no papel do usuário
  const findCaregiverLink = (token && user?.role === 'cliente') ? '/cliente/solicitar-servico' : '/cadastro';
  const offerServicesLink = (token && user?.role === 'colaborador') ? '/dashboard' : '/cadastro';

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
            <Link to={findCaregiverLink} className="px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg">
              Encontrar um Cuidador
            </Link>
            <Link to={offerServicesLink} className="px-8 py-3 text-lg font-semibold text-gray-800 bg-white rounded-lg hover:bg-gray-200 transition-colors shadow-lg">
              Oferecer Meus Serviços
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
