import React, { useState, useEffect } from 'react';
import './Inicio.css';
import { FiUser, FiLock, FiHeart, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Inicio = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setShake(true); 
      setTimeout(() => setShake(false), 500);
      return;
    }
    
    setIsLoading(true);    
    setTimeout(() => {
      setIsLoading(false); 
      onLogin(); 
      navigate('/pagina-principal', { replace: true });
    }, 2000);
  };

  useEffect(() => {
    const createMovingElement = () => {
      const element = document.createElement('div');
      element.className = 'moving-element';
      document.querySelector('.background-container').appendChild(element);
      
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      
      element.style.left = `${startX}%`;
      element.style.top = `${startY}%`;
      
      const move = () => {
        const newX = Math.random() * 100;
        const newY = Math.random() * 100;
        element.style.transition = `all ${10 + Math.random() * 20}s linear`;
        element.style.left = `${newX}%`;
        element.style.top = `${newY}%`;
        
        element.addEventListener('transitionend', move, { once: true });
      };
      
      setTimeout(move, Math.random() * 2000);
    };
    
    for (let i = 0; i < 15; i++) {
      createMovingElement();
    }
  }, []);

  return (
    <div className="login-container">
      <div className="background-container">
      </div>
      
      <div className={`login-box ${shake ? 'shake' : ''}`}>
        <div className="logo-container">
          <FiHeart className="logo-icon pulse" />
          <h1 className="logo-text">FeelConnect</h1>
        </div>

        <p className="slogan">Conecta tu mente, sé tú, sé valiente</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          
          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
        
        <div className="links-container">
          <a href="#" className="link">¿Olvidaste tu contraseña?</a>
          <a href="#" className="link">Regístrate</a>
        </div>
      </div>
    </div>
  );
};

export default Inicio;