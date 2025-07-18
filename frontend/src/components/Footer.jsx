import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; 2025 PetConnect. Todos os direitos reservados.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><Instagram /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};