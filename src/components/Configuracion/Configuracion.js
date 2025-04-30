import React from 'react';
import './Configuracion.css';

const Configuracion = () => {
  return (
    <div className="contenido-configuracion">
      <h1>Configuración</h1>
      <div className="configuracion-card">
        <div className="config-item">
          <label>Notificaciones</label>
          <input type="checkbox" />
        </div>
        <div className="config-item">
          <label>Tema</label>
          <select>
            <option>Claro</option>
            <option>Oscuro</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;