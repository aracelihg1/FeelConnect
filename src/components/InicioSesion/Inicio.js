/*
Nombre del programa:
FeelConnect - Sistema de Autenticación

¿Para qué sirve el programa?:
Sistema de inicio de sesión que valida credenciales de usuarios 
mediante conexión a backend, con almacenamiento seguro de tokens
y redirección a pantalla principal.

Autores:
Kelly Estefany Hernández Bandala
Araceli Hernández García

Fecha de creación: 
29/04/2025

Fecha de entrega:
16/05/2025
*/

import React, { useState, useEffect } from 'react';
import './Inicio.css';
import { FiUser, FiLock, FiHeart, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const Inicio = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/Usuario/login?correo=${encodeURIComponent(email)}&contrasenia=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Resultado del login:', result); 

        localStorage.setItem('usuarioId', result.idUsuario);
        localStorage.setItem('usuarioAlias', result.alias); 

            onLogin();
        navigate('/Principal', { replace: true });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Correo electrónico o contraseña inválidos',
          icon: 'error',
          confirmButtonColor: '#A78B7D',
          background: '#F8F1E9',
          color: '#5A4A42'
        });
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor',
        icon: 'error',
        confirmButtonColor: '#A78B7D',
        background: '#F8F1E9',
        color: '#5A4A42'
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="background-container"></div>

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
              type={showPassword ? 'text' : 'password'}
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
            {isLoading ? <span className="spinner"></span> : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="links-container">
          
          <Link to="/registro" className="link">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
