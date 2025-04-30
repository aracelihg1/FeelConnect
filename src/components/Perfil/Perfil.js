import React, { useState, useRef } from 'react';
import './Perfil.css';
import Swal from 'sweetalert2';

const Perfil = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    nombre: '',
    apellidos: '',
    edad: '',
    sexo: '',
    email: 'correo@ejemplo.com',
    avatar: null
  });
  
  const fileInputRef = useRef(null);

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
        setEditMode(false);
        Swal.fire({
          title: '¡Cambios guardados!',
          icon: 'success',
          confirmButtonColor: '#A78B7D'
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
                value={profile.apellidos}
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
                value={profile.email}
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
            <h2>{profile.nombre} {profile.apellidos}</h2>
            <p>{profile.email}</p>
            {profile.edad && <p>{profile.edad} años</p>}
            {profile.sexo && <p>{profile.sexo}</p>}
            
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