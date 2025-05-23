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
import Registro from './components/Registro/Registro';
import Vision from './components/Vision artificial/Vision';
import ChatbotIframe from './components/ChatbotIframe';

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
      <>
        <Routes>
          {/* Ruta para el inicio de sesión */}
          <Route
            path="/login"
            element={
              isAuthenticated ?
                <Navigate to="/pagina-principal" replace /> :
                <Inicio onLogin={handleLogin} />
            }
          />

          {/* Ruta para registro, accesible sin autenticación */}
          <Route path="/registro" element={<Registro />} />

          {/* Rutas protegidas */}
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
            <Route path="vision" element={<Vision />} />
            <Route index element={<Navigate to="/pagina-principal" replace />} />
          </Route>

          {/* Ruta por defecto */}
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/pagina-principal" : "/login"} replace />
            }
          />
        </Routes>

        {/* Mostrar el chatbot solo si está autenticado */}
         {isAuthenticated && <ChatbotIframe />}
      </>
    </Router>
  );
}

export default App;



