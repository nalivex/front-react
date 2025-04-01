import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div className="home-container">
			<div className="content-wrapper">
				<h1 className="title">Sistema de Gerenciamento</h1>
				<p className="subtitle">Selecione uma opção para continuar</p>

				<div className="buttons-container">
					<button
						className="action-btn clientes-btn"
						onClick={() => navigate('/lista-clientes')}
					>
						<span className="btn-icon">👥</span>
						<span className="btn-text">Lista de Clientes</span>
					</button>

					<button
						className="action-btn criar-btn"
						onClick={() => navigate('/criar-cliente')}
					>
						<span className="btn-icon">✏️</span>
						<span className="btn-text">Criar Cliente</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;