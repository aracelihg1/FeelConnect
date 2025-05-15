import React, { useState, useEffect, useRef } from 'react';
import './Perfil.css';
import Swal from 'sweetalert2';

const Perfil = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    nombre: '',
    apePat: '',
    edad: '',
    sexo: '',
    correo: '',
    alias: '',
    avatar: null,
    contrasenia: ''  // Añadido el campo para la contraseña
  });

  const fileInputRef = useRef(null);

  // Cargar perfil al montar componente
  useEffect(() => {
    const idUsuario = localStorage.getItem('usuarioId');
    if (!idUsuario) return;

    fetch(`http://localhost:8080/Usuario/${idUsuario}`)
      .then(res => res.json())
      .then(data => {
        setProfile({
          nombre: data.nombre || '',
          apePat: data.apePat || '',
          edad: data.edad || '',
          sexo: data.sexo || '',
          correo: data.correo || '',
          alias: data.alias || '',
          avatar: data.avatar || null,
          contrasenia: data.contrasenia || ''  // No pre-cargar la contraseña
        });
      })
      .catch(err => console.error('Error al obtener el perfil:', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setProfile(prev => ({
      ...prev,
      avatar: null
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    const idUsuario = localStorage.getItem('usuarioId');
    if (!idUsuario) return;

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
        fetch(`http://localhost:8080/Usuario/${idUsuario}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profile)
        })
          .then(response => {
            if (response.ok) {
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
        <div className="avatar-container">
          <div 
            className="avatar" 
            style={{ 
              backgroundImage: profile.avatar ? `url(${profile.avatar})` : 'none',
              backgroundColor: profile.avatar ? 'transparent' : '#D4B8A7'
            }}
            onClick={editMode ? triggerFileInput : null}
          >
            {!profile.avatar && '👤'}
          </div>
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
                name="apellidos"
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
                name="email"
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
                type="contrasenia"
                name="contrasenia"
                value={profile.contrasenia}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button 
                className="btn-cancel"
                onClick={() => setEditMode(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn-save"
                onClick={handleSave}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <h2>{profile.nombre} {profile.apePat}</h2>
            <p>{profile.correo}</p>
            {profile.edad && <p>{profile.edad} años</p>}
            {profile.sexo && <p>{profile.sexo}</p>}
            <p>{profile.alias}</p> {/* Mostrar el alias */}
            
            <button 
              className="btn-edit"
              onClick={() => setEditMode(true)}
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
