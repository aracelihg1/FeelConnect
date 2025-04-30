import React from 'react';
import './Temas.css';

const Temas = () => {
  const categorias = [
    {
      nombre: 'Emociones positivas',
      tipo: 'positivo',
      temas: [
        {
          nombre: 'Alegría',
          descripcion: 'Cultiva y mantén emociones positivas en tu vida diaria.',
          recursos: []
        },
        {
          nombre: 'Esperanza',
          descripcion: 'Construye una mentalidad optimista frente a desafíos.',
          recursos: []
        },
        {
          nombre: 'Amor propio',
          descripcion: 'Aprende a desarrollar una relación saludable contigo mismo.',
          recursos: []
        },
        {
          nombre: 'Gratitud',
          descripcion: 'Transforma tu perspectiva mediante el agradecimiento.',
          recursos: []
        },
        {
          nombre: 'Empatía',
          descripcion: 'Desarrolla conexiones más profundas con los demás.',
          recursos: []
        }
      ]
    },
    {
      nombre: 'Emociones difíciles',
      tipo: 'negativo',
      temas: [
        {
          nombre: 'Tristeza',
          descripcion: 'Entiende y gestiona este estado emocional natural.',
          recursos: []
        },
        {
          nombre: 'Ansiedad',
          descripcion: 'Herramientas para manejar la ansiedad de forma saludable.',
          recursos: []
        },
        {
          nombre: 'Ira',
          descripcion: 'Aprende a gestionar el enojo de manera constructiva.',
          recursos: []
        },
        {
          nombre: 'Estrés',
          descripcion: 'Técnicas para manejar el estrés en la vida diaria.',
          recursos: []
        },
        {
          nombre: 'Miedo',
          descripcion: 'Enfrenta tus temores con herramientas profesionales.',
          recursos: []
        },
        {
          nombre: 'Depresión',
          descripcion: 'Recursos para comprender y superar la depresión.',
          recursos: []
        }
      ]
    },
    {
      nombre: 'Temas sensibles',
      tipo: 'sensible',
      temas: [
        {
          nombre: 'Violencia de género',
          descripcion: 'Apoyo y recursos para situaciones de violencia.',
          recursos: []
        },
        {
          nombre: 'Acoso escolar o laboral',
          descripcion: 'Cómo identificar y actuar ante el acoso.',
          recursos: []
        },
        {
          nombre: 'Prevención del suicidio',
          descripcion: 'Ayuda profesional en momentos de crisis.',
          recursos: []
        },
        {
          nombre: 'Presión social o familiar',
          descripcion: 'Manejo de expectativas y establecimiento de límites.',
          recursos: []
        },
        {
          nombre: 'Consumo de sustancias',
          descripcion: 'Información y ayuda profesional sobre adicciones.',
          recursos: []
        }
      ]
    }
  ];

  return (
    <div className="temas-container">
      <h1 className="titulo-principal">Temas de Apoyo</h1>
      <p className="subtitulo">Recursos profesionales para tu bienestar emocional</p>
      
      <div className="categorias-container">
        {categorias.map((categoria, index) => (
          <div key={index} className="categoria">
            <h2 className={`titulo-categoria ${categoria.tipo}`}>{categoria.nombre}</h2>
            <div className="temas-grid">
              {categoria.temas.map((tema, i) => (
                <div key={i} className="tema-card">
                  <h3>{tema.nombre}</h3>
                  <p>{tema.descripcion}</p>
                  
                  <div className="recursos-container">
                    <h4>Recursos:</h4>
                    <ul>
                      {tema.recursos.map((recurso, j) => (
                        <li key={j}>
                          <a 
                            href={recurso.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="recurso-link"
                          >
                            {recurso.tipo}: {recurso.titulo}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Temas;
