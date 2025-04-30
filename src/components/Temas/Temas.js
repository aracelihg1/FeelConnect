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
          recursos: [
            {
              //tipo: 'Video',
             // titulo: 'Cómo aumentar tu alegría diaria - Psicología Positiva',
              //url: 'https://www.youtube.com/watch?v=5q4q3tM4-KE'
            }
          ]
        },
        {
          nombre: 'Esperanza',
          descripcion: 'Construye una mentalidad optimista frente a desafíos.',
          recursos: [
            {
              //tipo: 'Artículo',
              //titulo: 'El poder terapéutico de la esperanza',
              //url: 'https://psicologiaymente.com/psicologia/esperanza-salud-mental'
            }
          ]
        },
        {
          nombre: 'Amor propio',
          descripcion: 'Aprende a desarrollar una relación saludable contigo mismo.',
          recursos: [
            {
              //tipo: 'Guía',
              //titulo: 'Ejercicios para mejorar tu autoestima',
              //url: 'https://www.psicoactiva.com/blog/ejercicios-practicos-para-mejorar-la-autoestima/'
            }
          ]
        },
        {
          nombre: 'Gratitud',
          descripcion: 'Transforma tu perspectiva mediante el agradecimiento.',
          recursos: [
            {
              //tipo: 'Video',
              //titulo: 'Diario de gratitud en 5 minutos',
              //url: 'https://www.youtube.com/watch?v=Wb1xNiJjFsc'
            }
          ]
        },
        {
          nombre: 'Empatía',
          descripcion: 'Desarrolla conexiones más profundas con los demás.',
          recursos: [
            {
             // tipo: 'Artículo',
             // titulo: 'Ejercicios para mejorar tu empatía',
             // url: 'https://lamenteesmaravillosa.com/6-ejercicios-para-mejorar-tu-empatia/'
            }
          ]
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
          recursos: [
            {
              //tipo: 'Video',
              //titulo: 'Cómo procesar la tristeza saludablemente',
              //url: 'https://www.youtube.com/watch?v=6W7ALQJb1eY'
            }
          ]
        },
        {
          nombre: 'Ansiedad',
          descripcion: 'Herramientas para manejar la ansiedad de forma saludable.',
          recursos: [
            {
              //tipo: 'Línea de ayuda',
              //titulo: 'SAPTEL: 55 5259 8121',
              //url: 'tel:5552598121'
            }
          ]
        },
        {
          nombre: 'Ira',
          descripcion: 'Aprende a gestionar el enojo de manera constructiva.',
          recursos: [
            {
              //tipo: 'Artículo',
              //titulo: 'Control de ira: técnicas efectivas',
             // url: 'https://www.apa.org/topics/anger/control-es'
            }
          ]
        },
        {
          nombre: 'Estrés',
          descripcion: 'Técnicas para manejar el estrés en la vida diaria.',
          recursos: [
            {
             // tipo: 'Video',
             // titulo: 'Reducción de estrés en 5 minutos',
             // url: 'https://www.youtube.com/watch?v=6vO1wPAmiMQ'
            }
          ]
        },
        {
          nombre: 'Miedo',
          descripcion: 'Enfrenta tus temores con herramientas profesionales.',
          recursos: [
            {
             // tipo: 'Guía',
             // titulo: 'Cómo superar miedos irracionales',
              //url: 'https://www.clinicadeansiedad.com/problemas/miedos-y-fobias/'
            }
          ]
        },
        {
          nombre: 'Depresión',
          descripcion: 'Recursos para comprender y superar la depresión.',
          recursos: [
            {
              //tipo: 'Línea de ayuda',
              //titulo: 'Línea de la Vida: 800 911 2000',
             // url: 'tel:8009112000'
            }
          ]
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
          recursos: [
            {
             // tipo: 'Línea de emergencia',
              //titulo: 'Atención a víctimas: 800 911 2511',
              //url: 'tel:8009112511'
            }
          ]
        },
        {
          nombre: 'Acoso escolar o laboral',
          descripcion: 'Cómo identificar y actuar ante el acoso.',
          recursos: [
            {
              //tipo: 'Guía',
              //titulo: 'Protocolos contra el acoso',
              //url: 'https://www.gob.mx/conavim/articulos/protocolo-para-la-atencion-del-acoso-escolar'
            }
          ]
        },
        {
          nombre: 'Prevención del suicidio',
          descripcion: 'Ayuda profesional en momentos de crisis.',
          recursos: [
            {
              //tipo: 'Línea de ayuda',
              //titulo: 'Chat de atención emocional UANL',
            //  url: 'https://www.uanl.mx/atencion/'
            }
          ]
        },
        {
          nombre: 'Presión social o familiar',
          descripcion: 'Manejo de expectativas y establecimiento de límites.',
          recursos: [
            {
             // tipo: 'Artículo',
              //titulo: 'Cómo establecer límites saludables',
              //url: 'https://lamenteesmaravillosa.com/como-establecer-limites-sin-culpa/'
            }
          ]
        },
        {
          nombre: 'Consumo de sustancias',
          descripcion: 'Información y ayuda profesional sobre adicciones.',
          recursos: [
            {
              //tipo: 'Línea de ayuda',
             // titulo: 'Centro de atención: 800 911 2000',
              //url: 'tel:8009112000'
            }
          ]
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