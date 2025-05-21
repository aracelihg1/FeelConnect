/*
Nombre del programa:
FeelConnect - Sección Nosotros

¿Para qué sirve este archivo?
Establece la estructura y el estilo visual de la sección "Nosotros" en la plataforma FeelConnect. 
Incluye información sobre el equipo de trabajo, misión, visión, valores, ubicación y redes sociales 
de la empresa.

Autores:
Kelly Estefany Hernández Bandala  
Araceli Hernández García

Fecha de creación:
29/04/2025

Fecha de entrega:
16/05/2025
*/

import React from 'react';
// Íconos de redes sociales y ubicación
import { 
  FaFacebook, 
  FaInstagram, 
  FaTiktok, 
  FaMapMarkerAlt
} from 'react-icons/fa';
// Estilos específicos de la sección "Nosotros"
import './Nosotros.css';

// Componente principal de la sección "Nosotros"
const Nosotros = () => {
  return (
    <div className="nosotros-container">

      {/* Encabezado de la sección con animación */}
      <div className="nosotros-header css-animate-fade">
        <h1 className="titulo-foro">Conoce al equipo FeelConnect</h1>
        <p>La plataforma de bienestar emocional que te escucha</p>
        {/* Elemento decorativo con forma de ola */}
        <div className="header-wave"></div>
      </div>

      {/* Información de la empresa */}
      <div className="empresa-info">
        <div className="empresa-card css-animate-slide">
          <div className="logo-empresa">
            {/* Logo simplificado dentro de un círculo */}
            <div className="logo-circle">M</div>
            <h2>Mapaches S.A de C.V.</h2>
          </div>
          
          {/* Cuadro de misión, visión, filosofía y valores */}
          <div className="info-grid">
            {/* Visión */}
            <div className="info-card">
              <div className="slide-icon">👁️</div>
              <h3>Visión</h3>
              <p>Ser la plataforma líder en expresión emocional anónima y promoviendo el bienestar mental.</p>
            </div>
            {/* Misión */}
            <div className="info-card">
              <div className="slide-icon">🎯</div>
              <h3>Misión</h3>
              <p>Durante los siguientes 2 años buscamos consolidarnos como la plataforma de referencia en la expresión emocional anónima.</p>
            </div>
            {/* Filosofía */}
            <div className="info-card">
              <div className="slide-icon">💡</div>
              <h3>Filosofía</h3>
              <p>Convertirse en una aplicación web segura y completamente empática.</p>
            </div>
            {/* Valores */}
            <div className="info-card">
              <div className="slide-icon">❤️</div>
              <h3>Valores</h3>
              <ul className="valores-list">
                <li className="valor-item">Anonimato</li>
                <li className="valor-item">Respeto</li>
                <li className="valor-item">Empatía</li>
                <li className="valor-item">Solidaridad</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de miembros del equipo */}
      <div className="equipo-section">
        <h2>Nuestros Emprendedores</h2>
        <div className="equipo-grid">
          {/* Tarjeta de Araceli */}
          <div className="miembro-card css-animate-delay1">
            <div className="miembro-avatar">AH</div>
            <h3>Araceli Hernández García</h3>
            <p className="cargo">Directora General</p>
            {/* Onda decorativa */}
            <div className="miembro-wave"></div>
          </div>
          {/* Tarjeta de Kelly */}
          <div className="miembro-card css-animate-delay2">
            <div className="miembro-avatar">KH</div>
            <h3>Kelly Estefany Hernández Bandala</h3>
            <p className="cargo">Directora de Ventas y Marketing</p>
            <div className="miembro-wave"></div>
          </div>
        </div>
      </div>

      {/* Sección combinada de ubicación y redes */}
      <div className="ubicacion-redes">
        
        {/* Tarjeta con dirección física y mapa de Google */}
        <div className="ubicacion-card css-animate-slide">
          <h3><FaMapMarkerAlt /> Nuestra Ubicación</h3>
          <p>Fracción l y ll S/N, Aire Libre, Teziutlán, Puebla. 73960</p>
          <div className="mapa-container">
            <iframe 
              title="Ubicación FeelConnect"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15060.2779791285!2d-97.349477!3d19.325899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d01e3a9143e3a5%3A0x5f5e5e5e5e5e5e5e!2sTeziutl%C3%A1n%2C%20Puebla!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx" 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
        
        {/* Tarjeta con redes sociales */}
        <div className="redes-card css-animate-slide">
          <h3>Síguenos en redes</h3>
          <div className="redes-links">
            {/* Facebook */}
            <a href="https://www.facebook.com/share/16CcAbVJM3/" target="_blank" rel="noopener noreferrer" className="red-social">
              <div className="red-icon facebook"><FaFacebook /></div>
              <span>FeelConnect MX</span>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/feelconnectmx?igsh=ZTdtYm4zNHlxb2dv" target="_blank" rel="noopener noreferrer" className="red-social">
              <div className="red-icon instagram"><FaInstagram /></div>
              <span>@feelconnectmx</span>
            </a>
            {/* TikTok */}
            <a href="https://www.tiktok.com/@feelconnect7?_t=ZS-8vqEyq2drqp&_r=1" target="_blank" rel="noopener noreferrer" className="red-social">
              <div className="red-icon tiktok"><FaTiktok /></div>
              <span>@feelconnect</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportación del componente para su uso en la aplicación
export default Nosotros;
