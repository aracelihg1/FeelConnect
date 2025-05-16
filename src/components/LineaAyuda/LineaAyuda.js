/*
Nombre del programa:
FeelConnect - Estilos de Línea de Ayuda Psicológica

¿Para qué sirve este archivo?
Define el estilo visual de la sección de Líneas de Ayuda Psicológica, incluyendo la tipografía, 
colores, diseño de tarjetas para cada centro de ayuda, y una disposición responsiva para garantizar 
que la información se visualice de manera clara y accesible en cualquier dispositivo.

Autores:
Kelly Estefany Hernández Bandala  
Araceli Hernández García

Fecha de creación:
29/04/2025

Fecha de entrega:
16/05/2025
*/

import React from 'react';
import './LineaAyuda.css';

const LineaAyuda = () => {
  const centros = [
    {
      nombre: 'Consejería SAPTEL',
      descripcion: 'El Sistema Nacional de Apoyo, Consejo Psicológico e Intervención en Crisis por Teléfono, ofrece un servicio de terapia psicológica gratuita facilitada por psicólogos certificados.',
      contacto: '55 5259 8121',
      horario: '24/7',
      cobertura: 'Nacional',
      url: 'https://www.saptel.org.mx/',
      costo: 'Gratuito'
    },
    {
      nombre: 'Vivetel Salud Mental',
      descripcion: 'Servicio de atención psicológica gratuita vía telefónica, los psicólogos que la atienden se especializan en brindar intervención en crisis y orientar acerca de la prevención del suicidio.',
      contacto: '800 232 8432',
      horario: '24/7',
      cobertura: 'Nacional',
      url: 'https://www.salud.gob.mx/',
      costo: 'Gratuito'
    },
    {
      nombre: 'Centros Dinámica-Mente',
      descripcion: 'Brindan atención psicológica gratuita por teléfono a personas que están en situación de violencia.',
      contacto: '800 290 0024',
      horario: '24/7',
      cobertura: 'Nacional',
      url: 'https://www.gob.mx/salud',
      costo: 'Gratuito'
    },
    {
      nombre: 'Línea de ayuda Origen',
      descripcion: 'Brinda atención psicológica y orientación legal y médica, confidencial a nivel nacional.',
      contacto: '800 015 1617',
      horario: '24/7',
      cobertura: 'Nacional',
      url: 'https://www.origenac.org/',
      costo: 'Gratuito'
    },
    {
      nombre: 'Línea Háblalo',
      descripcion: 'Te ofrece orientación legal y atención psicológica de forma continua, confidencial y gratuita.',
      contacto: '800 422 5256',
      horario: '24/7',
      cobertura: 'Nacional',
      url: 'https://www.hablalo.gob.mx/',
      costo: 'Gratuito'
    },
    {
      nombre: 'EducatelSEP',
      descripcion: 'Servicio de orientación psicológica de la Secretaría de Educación Pública.',
      contacto: '55 3601 7599 / 800 288 66 88',
      horario: 'Lunes a Viernes 8:00 - 20:00',
      cobertura: 'Nacional',
      url: 'https://www.gob.mx/sep',
      costo: 'Gratuito'
    },
    {
      nombre: 'Consejo Ciudadano',
      descripcion: 'El Consejo Ciudadano para la Seguridad y Justicia, brinda asesoría jurídica y atención psicológica.',
      contacto: '55 5533 5533',
      horario: '24/7',
      cobertura: 'CDMX y área metropolitana',
      url: 'https://consejociudadanomx.org/',
      costo: 'Gratuito'
    },
    {
      nombre: 'Sistema Integral de Atención Para las Mujeres (SIAM)',
      descripcion: 'Línea 24/7 de apoyo a mujeres.',
      contacto: '075',
      horario: '24/7',
      cobertura: 'CDMX',
      url: 'https://www.siam.cdmx.gob.mx/',
      costo: 'Gratuito'
    },
    {
      nombre: 'Línea de Bienestar Emocional',
      descripcion: 'Brinda atención psicológica a público en general.',
      contacto: '55 5624 6003',
      horario: 'Lunes a Viernes 9:00 - 18:00',
      cobertura: 'CDMX',
      url: 'https://www.salud.cdmx.gob.mx/',
      costo: 'Gratuito'
    },
    {
      nombre: 'Instituto de la Juventud del Municipio de Puebla',
      descripcion: 'Brinda ayuda psicológica gratuita, solo se debe realizar una cita a través del número telefónico.',
      contacto: '222 213 0880',
      horario: 'Lunes a Viernes 9:00 - 17:00',
      cobertura: 'Puebla',
      url: 'https://www.pueblacapital.gob.mx/',
      costo: 'Gratuito'
    }
  ];

  return (
    <div className="linea-ayuda-container">
      <h1 className="titulo-ayuda">Líneas de Ayuda Psicológica</h1>
      <p className="subtitulo-ayuda">Servicios de apoyo emocional y prevención de crisis en México</p>
      
      <div className="centros-grid">
        {centros.map((centro, index) => (
          <div key={index} className="centro-card">
            <h2 className="nombre-centro">{centro.nombre}</h2>
            
            <div className="descripcion-box">
              <p className="descripcion-texto">{centro.descripcion}</p>
            </div>
            
            <div className="info-contacto">
              <div className="info-item">
                <span className="info-label">Teléfono:</span>
                <a href={`tel:${centro.contacto.replace(/[^0-9]/g, '')}`} className="info-value">
                  {centro.contacto}
                </a>
              </div>
              
              <div className="info-item">
                <span className="info-label">Horario:</span>
                <span className="info-value">{centro.horario}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Cobertura:</span>
                <span className="info-value">{centro.cobertura}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Costo:</span>
                <span className="info-value">{centro.costo}</span>
              </div>
            </div>
            
            {centro.url && (
              <a 
                href={centro.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-sitio-web"
              >
                Visitar sitio oficial
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineaAyuda;