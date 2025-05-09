import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Inicio from './components/InicioSesion/Inicio';
import Principal from './components/PaginaPrincipal/Principal';
import Perfil from './components/Perfil/Perfil';
import Configuracion from './components/Configuracion/Configuracion';
import Nosotros from './components/Nosotros/Nosotros';
import Temas from './components/Temas/Temas';
import Foros from './components/Foros/Foros';
import LineaAyuda from './components/LineaAyuda/LineaAyuda';
import Estadisticas from './components/Estadisticas/Estadisticas';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); 
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/pagina-principal" replace /> : 
              <Inicio onLogin={handleLogin} />
          } 
        />

        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Layout onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
          }
        >
          <Route path="pagina-principal" element={<Principal />} />
          <Route path="mi-perfil" element={<Perfil />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="temas" element={<Temas />} />
          <Route path="estadisticas" element={<Estadisticas />} /> 
          <Route path="foros" element={<Foros />} />
          <Route path="linea-ayuda" element={<LineaAyuda />} />
          <Route index element={<Navigate to="/pagina-principal" replace />} />
        </Route>

        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated ? "/pagina-principal" : "/login"} replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
