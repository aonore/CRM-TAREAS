import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/Layout';
import Dashboard from '@/Pages/Dashboard';
import Clientes from '@/Pages/Clientes';
import Tareas from '@/Pages/Tareas';
import Cobros from '@/Pages/Cobros';
import Configuracion from '@/Pages/Configuracion';
import ClienteDetalle from '@/Pages/ClienteDetalle';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/:id" element={<ClienteDetalle />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/cobros" element={<Cobros />} />
          <Route path="/configuracion" element={<Configuracion />} />
          {/* Ruta catch-all para redirigir a dashboard si no se encuentra la ruta */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;