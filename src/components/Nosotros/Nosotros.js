import React from 'react';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTiktok, 
  FaMapMarkerAlt
} from 'react-icons/fa';
import './Nosotros.css';

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      <div className="nosotros-header css-animate-fade">
        <h1 className="titulo-foro">Conoce al equipo FeelConnect</h1>
        <p>La plataforma de bienestar emocional que te escucha</p>
        <div className="header-wave"></div>
      </div>

      <div className="empresa-info">
        <div className="empresa-card css-animate-slide">
          <div className="logo-empresa">
            <div className="logo-circle">M</div>
            <h2>Mapaches S.A de C.V.</h2>
          </div>
          
          <div className="info-grid">
            {/* Primera fila */}
            <div className="info-card">
              <div className="slide-icon">👁️</div>
              <h3>Visión</h3>
              <p>Ser la plataforma líder en expresión emocional anónima y promoviendo el bienestar mental.</p>
            </div>
            
            <div className="info-card">
              <div className="slide-icon">🎯</div>
              <h3>Misión</h3>
              <p>Durante los siguientes 2 años buscamos consolidarnos como la plataforma de referencia en la expresión emocional anónima.</p>
            </div>

            {/* Segunda fila */}
            <div className="info-card">
              <div className="slide-icon">💡</div>
              <h3>Filosofía</h3>
              <p>Convertirse en una aplicación web segura y completamente empática.</p>
            </div>
            
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

      <div className="equipo-section">
        <h2>Nuestros Emprendedores</h2>
        <div className="equipo-grid">
          <div className="miembro-card css-animate-delay1">
            <div className="miembro-avatar">AH</div>
            <h3>Araceli Hernández García</h3>
            <p className="cargo">Directora General</p>
            <div className="miembro-wave"></div>
          </div>
          
          <div className="miembro-card css-animate-delay2">
            <div className="miembro-avatar">KH</div>
            <h3>Kelly Estefany Hernández Bandala</h3>
            <p className="cargo">Directora de Ventas y Marketing</p>
            <div className="miembro-wave"></div>
          </div>
        </div>
      </div>

      <div className="ubicacion-redes">
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
        
        <div className="redes-card css-animate-slide">
          <h3>Síguenos en redes</h3>
          <div className="redes-links">
            <a href="https://www.facebook.com/share/16CcAbVJM3/" target="_blank" rel="noopener noreferrer" className="red-social">
              <div className="red-icon facebook"><FaFacebook /></div>
              <span>FeelConnect MX</span>
            </a>
            <a href="https://www.instagram.com/feelconnectmx?igsh=ZTdtYm4zNHlxb2dv" target="_blank" rel="noopener noreferrer" className="red-social">
              <div className="red-icon instagram"><FaInstagram /></div>
              <span>@feelconnectmx</span>
            </a>
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

export default Nosotros;