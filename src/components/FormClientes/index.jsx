import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const CriarCliente = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		nome: '',
		email: '',
		telefone: ''
	});
	const [erro, setErro] = useState('');
	const [sucesso, setSucesso] = useState(false);
	const [carregando, setCarregando] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setCarregando(true);
		setErro('');

		try {
			const response = await axios.post('http://localhost:8000/api/public/clientes', formData, {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				withCredentials: false
			});

			setSucesso(true);
			setTimeout(() => navigate('/lista-clientes'), 1500);
		} catch (error) {
			if (error.response?.status === 422 || error.response?.status === 400) {
				const errorMessage = error.response?.data?.error ||
					error.response?.data?.errors?.email?.[0] ||
					'Email já cadastrado';
				setErro(errorMessage);
			} else {
				// Outros tipos de erro
				setErro(error.response?.data?.message || 'Erro ao cadastrar cliente');
			}
		} finally {
			setCarregando(false);
		}
	};

	return (
		<div className="form-container">
			<h2 className="form-title">Cadastrar Novo Cliente</h2>
			<button className="refresh-btn" onClick={() => navigate('/')}>
				Voltar
			</button>

			{sucesso && (
				<div className="alert success">
					Cliente cadastrado com sucesso! Redirecionando...
				</div>
			)}

			{erro && <div className="alert error">{erro}</div>}

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="nome">Nome Completo</label>
					<input
						type="text"
						id="nome"
						name="nome"
						value={formData.nome}
						onChange={handleChange}
						required
						placeholder="Digite o nome completo"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="email">E-mail</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						placeholder="exemplo@email.com"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="telefone">Telefone</label>
					<input
						type="tel"
						id="telefone"
						name="telefone"
						value={formData.telefone}
						onChange={handleChange}
						placeholder="(00) 00000-0000"
					/>
				</div>

				<div className="form-actions">
					<button
						type="button"
						className="btn secondary"
						onClick={() => navigate('/')}
						disabled={carregando}
					>
						Cancelar
					</button>
					<button
						type="submit"
						className="btn primary"
						disabled={carregando}
					>
						{carregando ? 'Cadastrando...' : 'Cadastrar Cliente'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CriarCliente;