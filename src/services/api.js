import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/public',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getClientes = () => api.get('/clientes.php');
export const createCliente = (data) => api.post('/clientes.php', data);

export default api;