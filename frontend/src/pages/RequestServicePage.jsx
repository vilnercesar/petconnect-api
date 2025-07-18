import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import * as clientService from '../services/clientService';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const RequestServicePage = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [formData, setFormData] = useState({
    service_type: '',
    collaborator_id: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const data = await clientService.getActiveCollaborators();
        setCollaborators(data);
      } catch (err) {
        
        if (err.response && err.response.status === 403) {
         
          setError(err.response.data.detail || 'Você não tem permissão para ver os colaboradores.');
        } else {
         
          setError('Não foi possível carregar a lista de colaboradores. Tente novamente.');
        }
        console.error("Erro ao buscar colaboradores:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollaborators();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validação simples
    if (!formData.service_type || !formData.collaborator_id) {
      setError('Por favor, selecione um serviço e um colaborador.');
      return;
    }

    try {
      // Converte o ID do colaborador para número antes de enviar
      const requestData = {
        ...formData,
        collaborator_id: parseInt(formData.collaborator_id)
      };
      await clientService.createServiceRequest(requestData);
      setSuccess('Solicitação de serviço enviada com sucesso! Você será redirecionado para o seu painel.');
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Ocorreu um erro ao enviar a solicitação.');
    }
  };

  if (loading) {
    return <div><Header /><p className="text-center mt-10">A carregar colaboradores...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto mt-10 px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Solicitar Novo Serviço</h1>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
          
          {/* Mostra a mensagem de erro principal se não for possível carregar os colaboradores */}
          {error && collaborators.length === 0 ? (
            <div className="flex flex-col items-center text-center p-4 text-red-700 bg-red-50 rounded-lg">
              <AlertCircle className="w-12 h-12 mb-4" />
              <h3 className="font-bold text-lg">Acesso Bloqueado</h3>
              <p className="mt-2">{error}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">Qual serviço você precisa?</label>
                <select
                  id="service_type"
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>Selecione um serviço</option>
                  <option value="pet_sitter">Pet Sitter</option>
                  <option value="hospedagem">Hospedagem</option>
                  <option value="passeio">Passeio</option>
                  <option value="pet_shop">Pet Shop</option>
                  <option value="creche">Creche</option>
                </select>
              </div>

              <div>
                <label htmlFor="collaborator_id" className="block text-sm font-medium text-gray-700">Para qual colaborador?</label>
                <select
                  id="collaborator_id"
                  name="collaborator_id"
                  value={formData.collaborator_id}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>Selecione um colaborador</option>
                  {collaborators.map(collab => (
                    <option key={collab.id} value={collab.id}>{collab.nome_completo}</option>
                  ))}
                </select>
              </div>

              {/* Mensagens de erro ou sucesso do formulário */}
              {error && collaborators.length > 0 && (
                  <div className="flex items-center p-3 text-sm rounded-lg bg-red-50 text-red-800">
                      <AlertCircle className="w-4 h-4 me-2" />{error}
                  </div>
              )}
              {success && (
                  <div className="flex items-center p-3 text-sm rounded-lg bg-green-50 text-green-800">
                      <CheckCircle className="w-4 h-4 me-2" />{success}
                  </div>
              )}

              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Confirmar Solicitação
                </button>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
};