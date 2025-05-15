import React from 'react';
import './Estadisticas.css';

const Estadisticas = () => {
  return (
    <div className="estadisticas-container">
      <h1 className="titulo-estadisticas">Estadísticas de la Comunidad</h1>

      <div className="dashboard-container">
        <iframe 
          title="Dashboard - FeelConnect" 
          className="powerbi-dashboard"
          src="https://app.powerbi.com/reportEmbed?reportId=c32db836-a97e-4fa8-a196-9af8f4651ae8&autoAuth=true&ctid=4d9a6d94-182b-4529-abd2-1a97909cb9a5" 
          frameBorder="0" 
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
};

export default Estadisticas;