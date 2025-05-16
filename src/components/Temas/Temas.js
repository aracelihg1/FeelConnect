/*
  Nombre del programa:
  FeelConnect - Componente de Temas de Apoyo Emocional

  ¿Para qué sirve este archivo?
  Muestra categorías de temas emocionales con descripciones y recursos profesionales 
  para apoyar el bienestar emocional de los usuarios.

  Autores:
  Kelly Estefany Hernández Bandala  
  Araceli Hernández García

  Fecha de creación:
  29/04/2025

  Fecha de entrega:
  16/05/2025
*/

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
              tipo: 'Artículo',
              titulo: 'Cómo potenciar la alegría y la felicidad',
              url: 'https://lauravpsicologia.com/como-potenciar-la-alegria-y-la-felicidad-4-herramientas-para-ser-mas-feliz/'
            }
          ]
        },
        {
          nombre: 'Esperanza',
          descripcion: 'Construye una mentalidad optimista frente a desafíos.',
          recursos: [
            {
              tipo: 'Artículo',
              titulo: 'Cómo cultivar la esperanza en tiempos difíciles',
              url: 'https://www.lavanguardia.com/vivo/psicologia/20210221/6249081/cultivar-esperanza-tiempos-dificiles.html'
            }
          ]
        },
        {
          nombre: 'Amor propio',
          descripcion: 'Aprende a desarrollar una relación saludable contigo mismo.',
          recursos: [
            {
              tipo: 'Artículo',
              titulo: 'La importancia del amor propio',
              url: 'https://starmed.care/es/la-importancia-del-amor-propio/'
            }
          ]
        },
        {
          nombre: 'Gratitud',
          descripcion: 'Transforma tu perspectiva mediante el agradecimiento.',
          recursos: [
            {
              tipo: 'Artículo',
              titulo: 'La gratitud: conciencia y aprecio de lo significativo y valioso',
              url: 'https://www.gaceta.unam.mx/la-gratitud-conciencia-y-apreciacion-de-lo-significativo-y-valioso/'
            }
          ]
        },
        {
          nombre: 'Empatía',
          descripcion: 'Desarrolla conexiones más profundas con los demás.',
          recursos: [
            {
              tipo: 'Artículo',
              titulo: 'Empatía: pegamento social que permite conectarnos con los demás',
              url: 'https://www.gaceta.unam.mx/empatia-pegamento-social-que-permite-conectarnos-con-los-demas/'
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
              tipo: 'Artículo',
              titulo: 'Qué es la tristeza según la psicología',
              url: 'https://www.nationalgeographicla.com/ciencia/2024/06/que-es-la-tristeza-segun-la-psicologia'
            }
          ]
        },
        {
          nombre: 'Ansiedad',
          descripcion: 'Herramientas para manejar la ansiedad de forma saludable.',
          recursos: [
            {
              tipo: 'Guía médica',
              titulo: 'Todo sobre la ansiedad',
              url: 'https://www.cun.es/enfermedades-tratamientos/enfermedades/ansiedad'
            }
          ]
        },
        {
          nombre: 'Ira',
          descripcion: 'Aprende a gestionar el enojo de manera constructiva.',
          recursos: [
            {
              tipo: 'Artículo',
              titulo: 'Cómo controlar la ira según la ciencia',
              url: 'https://www.bbc.com/mundo/articles/cvg1g1ze9z0o'
            }
          ]
        },
        {
          nombre: 'Estrés',
          descripcion: 'Técnicas para manejar el estrés en la vida diaria.',
          recursos: [
            {
              tipo: 'Guía médica',
              titulo: 'Información sobre el estrés',
              url: 'https://cuidateplus.marca.com/enfermedades/psicologicas/estres.html'
            }
          ]
        },
        {
          nombre: 'Miedo',
          descripcion: 'Enfrenta tus temores con herramientas profesionales.',
          recursos: [
            {
              tipo: 'Artículo',
              titulo: 'Qué es el miedo y cómo manejarlo',
              url: 'https://alceapsicologia.com/blog/que-es-el-miedo/'
            }
          ]
        },
        {
          nombre: 'Depresión',
          descripcion: 'Recursos para comprender y superar la depresión.',
          recursos: [
            {
              tipo: 'Guía médica',
              titulo: 'Manual MSD sobre depresión',
              url: 'https://www.msdmanuals.com/es/hogar/trastornos-de-la-salud-mental/trastornos-del-estado-de-%C3%A1nimo/depresi%C3%B3n?ruleredirectid=757'
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
              tipo: 'Recurso oficial',
              titulo: 'Información sobre violencia de género - ACNUR',
              url: 'https://www.acnur.org/mx/que-hacemos/salvaguardar-los-derechos-humanos/proteccion/violencia-de-genero'
            }
          ]
        },
        {
          nombre: 'Acoso escolar o laboral',
          descripcion: 'Cómo identificar y actuar ante el acoso.',
          recursos: [
            {
              tipo: 'Guía UNICEF',
              titulo: 'Información sobre acoso escolar',
              url: 'https://www.unicef.org/parenting/es/cuidado-infantil/acoso-escolar'
            },
            {
              tipo: 'PDF informativo',
              titulo: 'Qué hacer ante el acoso laboral - IMSS',
              url: 'https://educacionensalud.imss.gob.mx/ces_wp/wp-content/uploads/2021/06/quehacer-acoso-laboral.pdf'
            }
          ]
        },
        {
          nombre: 'Prevención del suicidio',
          descripcion: 'Ayuda profesional en momentos de crisis.',
          recursos: [
            {
              tipo: 'Recurso oficial',
              titulo: 'Información sobre prevención del suicidio - NIH',
              url: 'https://www.nimh.nih.gov/health/topics/espanol/prevencion-del-suicidio'
            }
          ]
        },
        {
          nombre: 'Presión social o familiar',
          descripcion: 'Manejo de expectativas y establecimiento de límites.',
          recursos: [
            {
              tipo: 'Artículo',
              titulo: 'Cómo manejar la presión social',
              url: 'https://psicologiaymente.com/social/presion-social'
            }
          ]
        },
        {
          nombre: 'Consumo de sustancias',
          descripcion: 'Información y ayuda profesional sobre adicciones.',
          recursos: [
            {
              tipo: 'Guía médica',
              titulo: 'Información sobre consumo de sustancias en adolescentes',
              url: 'https://www.msdmanuals.com/es/hogar/salud-infantil/problemas-de-salud-en-adolescentes/uso-de-sustancias-en-adolescentes#Consumo-de-tabaco-en-adolescentes_v818022_es'
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