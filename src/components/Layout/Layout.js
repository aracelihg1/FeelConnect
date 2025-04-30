import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MenuLateral from '../MenuLateral/MenuLateral';
import './Layout.css';

const Layout = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth > 768);
    };

    handleResize();
  
    window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
  }, []);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;