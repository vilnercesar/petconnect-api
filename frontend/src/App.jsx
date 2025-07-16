import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('Carregando mensagem da API...');
  const [error, setError] = useState('');

  useEffect(() => {
    // Função para buscar a mensagem da API FastAPI
    const fetchMessage = async () => {
      try {
        // Faz a requisição GET para a rota raiz do backend
        const response = await axios.get('http://localhost:8000/');
        setMessage(response.data.message);
        setError(''); 
      } catch (err) {
        setMessage('Falha ao conectar com o backend.');
        setError('Verifique se a API do backend está rodando em http://localhost:8000.');
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchMessage();
  }, []); 

  return (
    <>
      <h1>PetConnect Frontend</h1>
      <div className="card">
        <h2>Mensagem do Backend:</h2>
        <p style={{ color: 'cyan', fontSize: '1.2em' }}>
          {message}
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
}

export default App;