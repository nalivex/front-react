import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import ListaClientes from './components/ListarClientes'; // Importe seu componente de lista
import CriarCliente from './components/FormClientes';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/lista-clientes" element={<ListaClientes />} /> {/* Rota para a lista */}
				<Route path="/criar-cliente" element={<CriarCliente />} />
			</Routes>
		</Router>
	);
}

export default App;