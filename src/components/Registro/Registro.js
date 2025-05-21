/*
  Nombre del programa:
  FeelConnect - Componente de Registro de Usuario

  ¿Para qué sirve este archivo?
  Permite registrar nuevos usuarios validando campos, mostrando mensajes de éxito o error,
  y enviando los datos al servidor para crear una cuenta.

  Autores:
  Kelly Estefany Hernández Bandala  
  Araceli Hernández García

  Fecha de creación:
  29/04/2025

  Fecha de entrega:
  16/05/2025
*/

import React, { useState } from 'react';
import './Registro.css';
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi'; // Íconos para inputs y botón de mostrar/ocultar contraseña
import { useNavigate, Link } from 'react-router-dom'; // Para navegación entre rutas
import Swal from 'sweetalert2'; // Para mostrar alertas bonitas

const Registro = () => {
  // Estados para guardar valores de los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apeMat, setApeMat] = useState('');
  const [apePat, setApePat] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [alias, setAlias] = useState('');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Control para mostrar/ocultar contraseña
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar carga al enviar formulario
  const [shake, setShake] = useState(false); // Para animar el formulario si falta un campo
  const navigate = useNavigate(); // Hook para redireccionar al login tras registro exitoso

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que no haya campos vacíos
    if (!nombre || !apeMat || !apePat || !correo || !contrasenia || !alias || !edad || !sexo) {
      setShake(true); // Agregar clase de animación para aviso visual
      setTimeout(() => setShake(false), 500); // Quitar animación después de 0.5s
      return;
    }

    setIsLoading(true); // Mostrar indicador de carga

    // Crear objeto con datos del usuario
    const usuario = {
      nombre,
      apeMat,
      apePat,
      correo,
      contrasenia,
      alias,
      edad,
      sexo
    };

    try {
      // Enviar petición POST al backend para crear usuario
      const response = await fetch('http://localhost:8080/Usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        setIsLoading(false);
        // Mostrar mensaje de éxito y redirigir a login
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente. Puedes iniciar sesión ahora.',
          icon: 'success',
          confirmButtonColor: '#A78B7D',
          background: '#F8F1E9',
          color: '#5A4A42'
        }).then(() => {
          navigate('/login', { replace: true });
        });
      } else if (response.status === 409) {
        // Si hay conflicto (ej. correo o alias ya registrados), mostrar error
        const errorText = await response.text();
        Swal.fire({
          title: 'Error al registrar',
          text: errorText,
          icon: 'error',
          confirmButtonColor: '#A78B7D',
          background: '#F8F1E9',
          color: '#5A4A42'
        });
        setIsLoading(false);
      } else {
        // Error desconocido
        console.error('Error desconocido al registrar usuario');
        setIsLoading(false);
      }
    } catch (error) {
      // Error de red o servidor
      console.error('Error de red:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Fondo decorativo */}
      <div className="background-container"></div>

      {/* Caja principal del formulario con animación shake */}
      <div className={`register-box ${shake ? 'shake' : ''}`}>
        {/* Logo y título */}
        <div className="logo-container">
          <FiUser className="logo-icon pulse" />
          <h1 className="logo-text">FeelConnect</h1>
        </div>

        {/* Lema o slogan */}
        <p className="slogan">Conecta tu mente, sé tú, sé valiente</p>
        
        {/* Formulario de registro */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* Campo Nombre */}
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="register-input"
              required
            />
          </div>

          {/* Campo Apellido Paterno */}
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              placeholder="Apellido Paterno"
              value={apePat}
              onChange={(e) => setApePat(e.target.value)}
              className="register-input"
              required
            />
          </div>

          {/* Campo Apellido Materno */}
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              placeholder="Apellido Materno"
              value={apeMat}
              onChange={(e) => setApeMat(e.target.value)}
              className="register-input"
              required
            />
          </div>

          {/* Campo Correo */}
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="register-input"
              required
            />
          </div>

          {/* Campo Contraseña con botón para mostrar/ocultar */}
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              className="register-input"
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

          {/* Campo Alias */}
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              placeholder="Alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="register-input"
              required
            />
          </div>

          {/* Campo Edad */}
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="number"
              placeholder="Edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="register-input"
              min="1"
              max="120"
              required
            />
          </div>

          {/* Campo Sexo con selección */}
          <div className="input-group">
            <FiUser className="input-icon" />
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="register-input"
              required
            >
              <option value="">Selecciona tu sexo</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decir">Prefiero no decir</option>
            </select>
          </div>

          {/* Botón de registro con indicador de carga */}
          <button 
            type="submit" 
            className={`register-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span> // Mostrar spinner mientras carga
            ) : (
              'Registrarse'
            )}
          </button>
        </form>

        {/* Enlace para ir a la página de login */}
        <div className="links-container">
          <Link to="/login" className="link">¿Ya tienes cuenta? Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
