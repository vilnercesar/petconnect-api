import React from 'react';
import { Home, Dog, Footprints, School, ShoppingCart } from 'lucide-react';

export const Services = () => {
    const services = [
        { icon: <Home size={48} className="mx-auto text-indigo-500 mb-4" />, title: "Hospedagem", description: "Um lar seguro e confortável para seu pet enquanto você viaja." },
        { icon: <Dog size={48} className="mx-auto text-indigo-500 mb-4" />, title: "Pet Sitter", description: "Cuidamos do seu amigo no conforto da sua própria casa." },
        { icon: <Footprints size={48} className="mx-auto text-indigo-500 mb-4" />, title: "Passeio", description: "Passeios divertidos e cheios de energia para gastar a bateria." },
        { icon: <School size={48} className="mx-auto text-indigo-500 mb-4" />, title: "Creche", description: "Socialização e diversão supervisionada durante o dia." },
        { icon: <ShoppingCart size={48} className="mx-auto text-indigo-500 mb-4" />, title: "Pet Shop", description: "Produtos e acessórios entregues com carinho para seu pet." }
    ];

    return (
        <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-3">Nossos Serviços</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Tudo o que seu pet precisa em um só lugar, com cuidadores verificados e apaixonados.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            {service.icon}
                            <h3 className="font-semibold text-lg">{service.title}</h3>
                            <p className="text-gray-500 text-sm mt-1">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};