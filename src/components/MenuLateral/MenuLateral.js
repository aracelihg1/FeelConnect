import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiX, FiHome, FiUser, FiUsers, FiBook, 
  FiMessageSquare, FiLifeBuoy, FiSettings, FiLogOut 
} from 'react-icons/fi';
import Swal from 'sweetalert2';
import './MenuLateral.css';

const MenuLateral = ({ isOpen, onClose, onLogout }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <FiHome />, text: 'Inicio', path: '/pagina-principal' },
    { icon: <FiUser />, text: 'Mi perfil', path: '/mi-perfil' },
    { icon: <FiUsers />, text: 'Nosotros', path: '/nosotros' },
    { icon: <FiBook />, text: 'Temas', path: '/temas' },
    { icon: <FiMessageSquare />, text: 'Foros', path: '/foros' },
    { icon: <FiLifeBuoy />, text: 'Línea de ayuda', path: '/linea-ayuda' },
    { icon: <FiSettings />, text: 'Configuración', path: '/configuracion' },
  ];

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
        onLogout();
      }
    });
  };

  return (
    <div className={`menu-lateral ${isOpen ? 'open' : ''}`}>
      <div className="menu-header">
        <h2 className="logo-text">FeelConnect</h2>
        <button className="close-btn" onClick={onClose}>
          <FiX size={24} />
        </button>
      </div>
      
      <nav className="menu-nav">
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li 
              key={index} 
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <Link to={item.path} className="menu-link">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.text}</span>
              </Link>
            </li>
          ))}
          
          <li className="menu-item">
            <button className="menu-link" onClick={handleLogout}>
              <span className="menu-icon"><FiLogOut /></span>
              <span className="menu-label">Salir</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="menu-footer">
        <p className="footer-text">Conecta con tus emociones</p>
      </div>
    </div>
  );
};

export default MenuLateral;