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

function App() {
  // Estado para controlar la autenticación (ahora solo en memoria)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función que se ejecuta cuando el login es exitoso
  const handleLogin = () => {
    setIsAuthenticated(true); // Establece el estado de autenticación a true
  };

  // Función que se ejecuta al hacer logout
  const handleLogout = () => {
    setIsAuthenticated(false); // Establece el estado de autenticación a false
  };

  return (
    <Router>
      <Routes>
        {/* Ruta para el login - accesible solo si no está autenticado */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/pagina-principal" replace /> : 
              <Inicio onLogin={handleLogin} />
          } 
        />

        {/* Rutas protegidas - solo accesibles con autenticación */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              // Si está autenticado, muestra el Layout con menú lateral
              <Layout onLogout={handleLogout} /> : 
              // Si no está autenticado, redirige al login
              <Navigate to="/login" replace />
          }
        >
          {/* Ruta para la página principal */}
          <Route path="pagina-principal" element={<Principal />} />
          
          {/* Resto de rutas protegidas */}
          <Route path="mi-perfil" element={<Perfil />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="temas" element={<Temas />} />
          <Route path="foros" element={<Foros />} />
          <Route path="linea-ayuda" element={<LineaAyuda />} />
          
          {/* Redirección por defecto para la ruta raíz */}
          <Route index element={<Navigate to="/pagina-principal" replace />} />
        </Route>

        {/* Ruta comodín para manejar páginas no encontradas */}
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