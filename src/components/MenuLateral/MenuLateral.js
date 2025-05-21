/*
  Nombre del programa:
  FeelConnect - Componente MenuLateral

  ¿Para qué sirve este archivo?
  Proporciona un menú lateral de navegación con enlaces a las diferentes
  secciones de la aplicación, manejo del estado activo y funcionalidad de cierre de sesión.

  Autores:
  Kelly Estefany Hernández Bandala  
  Araceli Hernández García

  Fecha de creación:
  29/04/2025

  Fecha de entrega:
  16/05/2025
*/

import React from 'react';
// Importamos Link para navegación y useLocation para saber qué ruta está activa
import { Link, useLocation } from 'react-router-dom';
// Iconos del menú
import { 
  FiX, FiHome, FiUser, FiUsers, FiBook, 
  FiMessageSquare, FiLifeBuoy, FiCreditCard, 
  FiLogOut, FiBarChart2, FiEye 
} from 'react-icons/fi';
// Librería para mostrar alertas
import Swal from 'sweetalert2';
// Estilos del menú lateral
import './MenuLateral.css';

// Componente funcional que recibe props: isOpen (estado del menú), onClose (cierra el menú), onLogout (cierra sesión)
const MenuLateral = ({ isOpen, onClose, onLogout }) => {
  const location = useLocation(); // Obtiene la ruta actual

  // Lista de elementos del menú con su ícono, texto y ruta
  const menuItems = [
    { icon: <FiHome />, text: 'Inicio', path: '/pagina-principal' },
    { icon: <FiUser />, text: 'Mi perfil', path: '/mi-perfil' },
    { icon: <FiBook />, text: 'Temas', path: '/temas' },
    { icon: <FiBarChart2 />, text: 'Estadísticas', path: '/estadisticas' },
    { icon: <FiMessageSquare />, text: 'Foros', path: '/foros' },
    { icon: <FiLifeBuoy />, text: 'Línea de ayuda', path: '/linea-ayuda' },
    { icon: <FiCreditCard />, text: 'Pagos', path: '/configuracion' },
    { icon: <FiEye />, text: 'Visión Artificial', path: '/vision' }, // Ruta corregida
    { icon: <FiUsers />, text: 'Nosotros', path: '/nosotros' },
  ];

  // Función para cerrar sesión con confirmación mediante SweetAlert
  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres cerrar tu sesión?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout(); // Ejecuta la función de cierre de sesión
      }
    });
  };

  return (
    // Contenedor principal del menú lateral. Se abre con clase 'open' si isOpen es true
    <div className={`menu-lateral ${isOpen ? 'open' : ''}`}>
      
      {/* Encabezado del menú con logo y botón de cerrar */}
      <div className="menu-header">
        <h2 className="logo-text">FeelConnect</h2>
        <button className="close-btn" onClick={onClose}>
          <FiX size={24} />
        </button>
      </div>
      
      {/* Navegación principal */}
      <nav className="menu-nav">
        <ul className="menu-list">
          {/* Recorremos los elementos del menú para mostrarlos */}
          {menuItems.map((item, index) => (
            <li 
              key={index} 
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`} // Activa visualmente si es la ruta actual
            >
              <Link to={item.path} className="menu-link">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.text}</span>
              </Link>
            </li>
          ))}

          {/* Opción para cerrar sesión */}
          <li className="menu-item">
            <button className="menu-link" onClick={handleLogout}>
              <span className="menu-icon"><FiLogOut /></span>
              <span className="menu-label">Salir</span>
            </button>
          </li>
        </ul>
      </nav>
      
      {/* Pie del menú con mensaje emocional */}
      <div className="menu-footer">
        <p className="footer-text">Conecta con tus emociones</p>
      </div>
    </div>
  );
};

// Exportamos el componente para usarlo en la aplicación
export default MenuLateral;
