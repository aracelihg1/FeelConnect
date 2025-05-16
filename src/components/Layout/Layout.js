/*
  Nombre del programa:
  FeelConnect - Componente Layout Principal

  ¿Para qué sirve este archivo?
  Administra la estructura general de la aplicación con el menú lateral y el área principal.
  Controla la visibilidad del menú lateral y adapta la interfaz a diferentes tamaños de pantalla.

  Autores:
  Kelly Estefany Hernández Bandala  
  Araceli Hernández García

  Fecha de creación:
  29/04/2025

  Fecha de entrega:
  16/05/2025
*/

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MenuLateral from '../MenuLateral/MenuLateral';
import './Layout.css';

// Estado para controlar si el menú lateral está abierto o cerrado
const Layout = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // useEffect para ajustar el menú según el tamaño de la ventana (abre menú si ancho > 768px)
  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth > 768);
    };

    handleResize();
  
    window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Función para alternar la visibilidad del menú latera
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Renderiza el menú lateral y el contenido principal con un botón para mostrar/ocultar menú
  return (
    <div className="layout-container">
      <MenuLateral 
        isOpen={isMenuOpen} 
        onClose={toggleMenu}
        onLogout={onLogout}
      />
      
      <main className={`main-content ${isMenuOpen ? 'menu-open' : ''}`}>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        
        <Outlet /> {/* Renderiza las rutas hijas */}
      </main>
    </div>
  );
};

export default Layout;