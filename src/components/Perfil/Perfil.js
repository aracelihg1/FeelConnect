/*
  Nombre del programa:
  FeelConnect - Perfil de Usuario

  ¿Para qué sirve este archivo?
  Permite visualizar y editar la información personal del usuario, como nombre,
  apellidos, edad, sexo, correo, alias, contraseña y foto de perfil.

  Autores:
  Kelly Estefany Hernández Bandala  
  Araceli Hernández García

  Fecha de creación:
  29/04/2025

  Fecha de entrega:
  16/05/2025
*/

import React, { useState, useEffect, useRef } from 'react';
import './Perfil.css';
import Swal from 'sweetalert2';

const Perfil = () => {
  // Estado para controlar si estamos en modo edición o solo visualización
  const [editMode, setEditMode] = useState(false);

  // Estado para guardar los datos del perfil
  const [profile, setProfile] = useState({
    nombre: '',
    apePat: '',
    edad: '',
    sexo: '',
    correo: '',
    alias: '',
    avatar: null,
    contrasenia: ''  // Campo para la contraseña
  });

  // Referencia para el input tipo file oculto, para subir avatar
  const fileInputRef = useRef(null);

  // useEffect para cargar la información del perfil al montar el componente
  useEffect(() => {
    const idUsuario = localStorage.getItem('usuarioId'); // Obtener id de usuario desde localStorage
    if (!idUsuario) return;  // Si no hay id, no continuar

    // Petición para obtener los datos del usuario por su id
    fetch(`http://localhost:8080/Usuario/${idUsuario}`)
      .then(res => res.json())
      .then(data => {
        // Actualiza el estado profile con la info obtenida, asegurando valores por defecto
        setProfile({
          nombre: data.nombre || '',
          apePat: data.apePat || '',
          edad: data.edad || '',
          sexo: data.sexo || '',
          correo: data.correo || '',
          alias: data.alias || '',
          avatar: data.avatar || null,
          contrasenia: data.contrasenia || ''  // No se suele pre-cargar contraseña visible
        });
      })
      .catch(err => console.error('Error al obtener el perfil:', err));
  }, []);

  // Función para actualizar el estado profile cuando cambia un input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Maneja el cambio de archivo para el avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Guarda la imagen en base64 en el estado profile.avatar para previsualización
        setProfile(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para eliminar la foto de perfil (avatar)
  const handleRemoveAvatar = () => {
    setProfile(prev => ({
      ...prev,
      avatar: null
    }));
  };

  // Función para simular click en input file oculto
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Función para guardar los cambios haciendo una petición PUT
  const handleSave = () => {
    const idUsuario = localStorage.getItem('usuarioId');
    if (!idUsuario) return;

    // Confirmación modal antes de guardar cambios
    Swal.fire({
      title: '¿Guardar cambios?',
      text: 'Se actualizará tu información de perfil',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#A78B7D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Petición PUT para actualizar perfil
        fetch(`http://localhost:8080/Usuario/${idUsuario}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profile)
        })
          .then(response => {
            if (response.ok) {
              // Mostrar mensaje éxito y salir de modo edición
              Swal.fire({
                title: '¡Cambios guardados!',
                icon: 'success',
                confirmButtonColor: '#A78B7D'
              });
              setEditMode(false);
            } else {
              throw new Error("Error en la actualización");
            }
          })
          .catch(err => {
            // Mostrar error si la actualización falla
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar el perfil.',
              icon: 'error',
              confirmButtonColor: '#d33'
            });
          });
      }
    });
  };

  return (
    <div className="contenido-perfil">
      <h1>Mi Perfil</h1>
      <div className="perfil-card">
        {/* Contenedor de avatar con imagen o icono */}
        <div className="avatar-container">
          <div 
            className="avatar" 
            style={{ 
              backgroundImage: profile.avatar ? `url(${profile.avatar})` : 'none',
              backgroundColor: profile.avatar ? 'transparent' : '#D4B8A7'
            }}
            onClick={editMode ? triggerFileInput : null} // Solo permite cambiar avatar en modo edición
          >
            {!profile.avatar && '👤'} {/* Icono por defecto si no hay avatar */}
          </div>

          {/* Opciones para cambiar o eliminar avatar, visibles solo en modo edición */}
          {editMode && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <div className="avatar-actions">
                <button 
                  className="btn-change-avatar"
                  onClick={triggerFileInput}
                >
                  Cambiar Foto
                </button>
                {profile.avatar && (
                  <button 
                    className="btn-remove-avatar"
                    onClick={handleRemoveAvatar}
                  >
                    Eliminar Foto
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Si estamos en modo edición, mostrar formulario con inputs */}
        {editMode ? (
          <div className="profile-form">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={profile.nombre}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Apellidos</label>
              <input
                type="text"
                name="apePat"  // corregido para que coincida con el estado
                value={profile.apePat}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Edad</label>
              <input
                type="number"
                name="edad"
                value={profile.edad}
                onChange={handleInputChange}
                min="1"
                max="120"
              />
            </div>
            
            <div className="form-group">
              <label>Sexo</label>
              <select
                name="sexo"
                value={profile.sexo}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar...</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
                <option value="Prefiero no decir">Prefiero no decir</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="correo"  // corregido para que coincida con el estado
                value={profile.correo}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Alias</label>
              <input
                type="text"
                name="alias"
                value={profile.alias}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"  // para ocultar caracteres
                name="contrasenia"
                value={profile.contrasenia}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button 
                className="btn-cancel"
                onClick={() => setEditMode(false)} // Cancela la edición sin guardar
              >
                Cancelar
              </button>
              <button 
                className="btn-save"
                onClick={handleSave} // Guarda los cambios
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        ) : (
          // Modo visualización, muestra los datos pero no permite editar
          <div className="profile-info">
            <h2>{profile.nombre} {profile.apePat}</h2>
            <p>{profile.correo}</p>
            {profile.edad && <p>{profile.edad} años</p>}
            {profile.sexo && <p>{profile.sexo}</p>}
            <p>{profile.alias}</p>
            
            <button 
              className="btn-edit"
              onClick={() => setEditMode(true)} // Pasa a modo edición
            >
              Editar Perfil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
