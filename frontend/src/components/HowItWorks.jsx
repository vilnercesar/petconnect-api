import React from 'react';
import { Search, CalendarCheck, HeartHandshake } from 'lucide-react';

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Simples, Rápido e Seguro</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                    <div className="text-center max-w-xs">
                        <div className="bg-indigo-100 text-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">1. Busque</h3>
                        <p className="text-gray-600">Encontre o serviço e o colaborador perfeito para a necessidade do seu pet.</p>
                    </div>
                    <div className="text-center max-w-xs">
                        <div className="bg-indigo-100 text-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarCheck className="w-10 h-10" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">2. Solicite</h3>
                        <p className="text-gray-600">Envie a solicitação e aguarde a confirmação rápida do colaborador.</p>
                    </div>
                    <div className="text-center max-w-xs">
                        <div className="bg-indigo-100 text-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HeartHandshake className="w-10 h-10" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">3. Relaxe</h3>
                        <p className="text-gray-600">Seu pet está em boas mãos! Acompanhe tudo pela plataforma.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
