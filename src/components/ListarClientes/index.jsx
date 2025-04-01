import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const ListaClientes = () => {
	const navigate = useNavigate();
	const [clientes, setClientes] = useState([]);
	const [carregando, setCarregando] = useState(true);
	const [erro, setErro] = useState(null);

	const buscarClientes = async () => {
		try {
			setCarregando(true);
			const resposta = await axios.get('http://localhost:8000/api/public/clientes');
			setClientes(resposta.data);
			setErro(null);
		} catch (error) {
			setErro('Erro ao carregar clientes');
			console.error('Erro na requisição:', error);
		} finally {
			setCarregando(false);
		}
	};

	useEffect(() => {
		buscarClientes();
	}, []);

	const formatarData = (dataString) => {
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		return new Date(dataString).toLocaleDateString('pt-BR', options);
	};

	if (carregando) {
		return (
			<div className="loading-container">
				<div className="spinner"></div>
				<p>Carregando clientes...</p>
			</div>
		);
	}

	if (erro) {
		return (
			<div className="error-container">
				<div className="error-message">
					<p>{erro}</p>
					<button className="retry-btn" onClick={buscarClientes}>
						Tentar novamente
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="clientes-container">
			<div className="header">
				<h2>Clientes Cadastrados</h2>
				<button className="refresh-btn" onClick={() => navigate('/')}>
					Voltar
				</button>
			</div>

			<div className="table-wrapper">
				<table className="clientes-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nome</th>
							<th>Email</th>
							<th>Telefone</th>
							<th>Data de Cadastro</th>
						</tr>
					</thead>
					<tbody>
						{clientes.map(cliente => (
							<tr key={cliente.id}>
								<td>{cliente.id}</td>
								<td>{cliente.nome}</td>
								<td>{cliente.email}</td>
								<td>{cliente.telefone || 'Não informado'}</td>
								<td>{formatarData(cliente.data_cadastro)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ListaClientes;