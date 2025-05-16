/*
Nombre del programa:
FeelConnect - Visualización de Estadísticas

¿Para qué sirve este archivo?
Este componente permite visualizar estadísticas generales 
a través de un panel  de Power BI. Facilita el análisis 
visual de datos en tiempo real.

Autores:
Kelly Estefany Hernández Bandala  
Araceli Hernández García

Fecha de creación:
11/05/2025

Fecha de entrega:
16/05/2025
*/

import './Estadisticas.css';

// Componente funcional Estadisticas
const Estadisticas = () => {
  return (
    // Contenedor principal de la página de estadísticas
    <div className="estadisticas-page">
      {/* Contenedor interno que centra y organiza el contenido */}
      <div className="content-container">
        {/* Título principal de la sección */}
        <h1 className="titulo-estadisticas">Estadísticas de la Comunidad</h1>
        {/* Contenedor que incluye el iframe del dashboard */}
        <div className="estadisticas-container"> 
           {/* Iframe que embebe un dashboard de Power BI */}
          <iframe 
            title="Dashboard - FeelConnect" 
            className="powerbi-dashboard"
            src="https://app.powerbi.com/reportEmbed?reportId=c32db836-a97e-4fa8-a196-9af8f4651ae8&autoAuth=true&ctid=4d9a6d94-182b-4529-abd2-1a97909cb9a5" 
            frameBorder="0" 
            allowFullScreen="true"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;