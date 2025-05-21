/*
Nombre del programa:
FeelConnect - Componente de Foros

¿Para qué sirve este archivo?
Este componente permite a los usuarios compartir experiencias emocionales
de forma anónima, reaccionar con emojis y responder a otros mensajes.
Fomenta un espacio seguro de apoyo emocional dentro de la comunidad.
Incluye clasificación automática de sentimiento para cada publicación.

Autores:
Kelly Estefany Hernández Bandala  
Araceli Hernández García

Fecha de creación:
29/04/2025

Fecha de entrega:
16/05/2025
*/

import React, { useState, useEffect } from 'react';
import './Foros.css';

// Emojis que los usuarios pueden usar como reacciones
const EMOJIS = {
  LIKE: '👍',
  HEART: '❤️',
  SMILE: '😊',
  THINK: '🤔'
};

// Función que genera un nombre de usuario anónimo aleatorio
const generateRandomUsername = () => {
  const adjectives = ['Anónimo', 'Misterioso', 'Secreto', 'Silencioso', 'Invisible', 'Oculto', 'Desconocido', 'Misterioso'];
  const nouns = ['Amigo', 'Visitante', 'Usuario', 'Participante', 'Colaborador', 'Explorador', 'Viajero', 'Soñador'];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdj} ${randomNoun} ${Math.floor(1000 + Math.random() * 9000)}`;
};

// Función para clasificar el texto usando el endpoint
const clasificarTexto = async (texto) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/predecir/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texto }),
    });

    if (!response.ok) {
      throw new Error('Error en la clasificación');
    }

    const data = await response.json();
    return data.prediccion === 1 ? 'positivo' : 'negativo';
  } catch (error) {
    console.error('Error al clasificar el texto:', error);
    return 'neutro'; // Valor por defecto en caso de error
  }
};

// Componente principal del foro
const Foros = () => {
  // Estado que contiene todos los mensajes
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      texto: "¿Alguien ha probado la técnica de respiración 4-7-8 para la ansiedad?",
      categoria: "negativo",
      sentimiento: "negativo",
      reacciones: { [EMOJIS.LIKE]: 5, [EMOJIS.HEART]: 3, [EMOJIS.SMILE]: 2 },
      respuestas: [
        {
          id: 101,
          texto: "Sí, a mí me funciona bastante bien antes de dormir",
          sentimiento: "positivo",
          reacciones: { [EMOJIS.LIKE]: 2 },
          usuario: generateRandomUsername()
        },
        {
          id: 102,
          texto: "Prefiero la meditación guiada personalmente",
          sentimiento: "neutro",
          reacciones: { [EMOJIS.HEART]: 1 },
          usuario: generateRandomUsername()
        }
      ],
      expandido: false,
      usuario: generateRandomUsername()
    },
    {
      id: 2,
      texto: "Hoy estoy practicando gratitud y quería compartirlo con ustedes",
      categoria: "positivo",
      sentimiento: "positivo",
      reacciones: { [EMOJIS.HEART]: 7, [EMOJIS.SMILE]: 4 },
      respuestas: [],
      expandido: false,
      usuario: generateRandomUsername()
    },
    {
      id: 3,
      texto: "Estoy lidiando con ataques de pánico recientemente, ¿algún consejo?",
      categoria: "sensible",
      sentimiento: "negativo",
      reacciones: { [EMOJIS.HEART]: 9, [EMOJIS.THINK]: 3 },
      respuestas: [
        {
          id: 103,
          texto: "A mí me ayudó mucho buscar ayuda profesional, no estás solo/a",
          sentimiento: "positivo",
          reacciones: { [EMOJIS.HEART]: 4 },
          usuario: generateRandomUsername()
        },
        {
          id: 104,
          texto: "Respiración profunda y contar objetos alrededor me ha servido",
          sentimiento: "positivo",
          reacciones: { [EMOJIS.LIKE]: 2 },
          usuario: generateRandomUsername()
        }
      ],
      expandido: false,
      usuario: generateRandomUsername()
    },
    {
      id: 4,
      texto: "¿Cómo manejan los pensamientos intrusivos? Me cuesta mucho",
      categoria: "sensible",
      sentimiento: "negativo",
      reacciones: { [EMOJIS.HEART]: 6, [EMOJIS.LIKE]: 2 },
      respuestas: [
        {
          id: 105,
          texto: "Terapia cognitivo-conductual puede ser muy útil para esto",
          sentimiento: "positivo",
          reacciones: { [EMOJIS.HEART]: 3 },
          usuario: generateRandomUsername()
        }
      ],
      expandido: false,
      usuario: generateRandomUsername()
    },
    {
      id: 5,
      texto: "Luchando con la depresión postparto, necesito apoyo",
      categoria: "sensible",
      sentimiento: "negativo",
      reacciones: { [EMOJIS.HEART]: 12, [EMOJIS.SMILE]: 1 },
      respuestas: [],
      expandido: false,
      usuario: generateRandomUsername()
    }
  ]);

  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [nuevaRespuesta, setNuevaRespuesta] = useState({});
  const [filtro, setFiltro] = useState('todos');
  const [categoriaMensaje, setCategoriaMensaje] = useState('positivo');
  const [cargando, setCargando] = useState(false);

  // Publica un nuevo mensaje después de clasificar su sentimiento
  const publicarMensaje = async () => {
    if (nuevoMensaje.trim()) {
      setCargando(true);
      try {
        const sentimiento = await clasificarTexto(nuevoMensaje);
        
        const nuevo = {
          id: Date.now(),
          texto: nuevoMensaje,
          categoria: categoriaMensaje,
          sentimiento: sentimiento,
          reacciones: {},
          respuestas: [],
          expandido: false,
          usuario: generateRandomUsername()
        };
        
        setMensajes([nuevo, ...mensajes]);
        setNuevoMensaje('');
      } catch (error) {
        console.error('Error al publicar mensaje:', error);
      } finally {
        setCargando(false);
      }
    }
  };

  // Agrega una respuesta a un mensaje específico después de clasificar su sentimiento
  const agregarRespuesta = async (mensajeId) => {
    if (nuevaRespuesta[mensajeId]?.trim()) {
      setCargando(true);
      try {
        const textoRespuesta = nuevaRespuesta[mensajeId];
        const sentimiento = await clasificarTexto(textoRespuesta);
        
        const respuesta = {
          id: Date.now(),
          texto: textoRespuesta,
          sentimiento: sentimiento,
          reacciones: {},
          usuario: generateRandomUsername()
        };

        setMensajes(mensajes.map(msg =>
          msg.id === mensajeId
            ? { ...msg, respuestas: [...msg.respuestas, respuesta], expandido: true }
            : msg
        ));
        setNuevaRespuesta({ ...nuevaRespuesta, [mensajeId]: '' });
      } catch (error) {
        console.error('Error al agregar respuesta:', error);
      } finally {
        setCargando(false);
      }
    }
  };

  // Agrega una reacción (emoji) a un mensaje o respuesta
  const agregarReaccion = (mensajeId, respuestaId, emoji) => {
    setMensajes(mensajes.map(msg => {
      if (msg.id === mensajeId) {
        if (!respuestaId) {
          // Reacción al mensaje principal
          const nuevasReacciones = { ...msg.reacciones };
          nuevasReacciones[emoji] = (nuevasReacciones[emoji] || 0) + 1;
          return { ...msg, reacciones: nuevasReacciones };
        } else {
          // Reacción a una respuesta
          const nuevasRespuestas = msg.respuestas.map(resp => {
            if (resp.id === respuestaId) {
              const nuevasReacciones = { ...resp.reacciones };
              nuevasReacciones[emoji] = (nuevasReacciones[emoji] || 0) + 1;
              return { ...resp, reacciones: nuevasReacciones };
            }
            return resp;
          });
          return { ...msg, respuestas: nuevasRespuestas };
        }
      }
      return msg;
    }));
  };

  // Alterna entre mostrar u ocultar las respuestas de un mensaje
  const toggleExpandido = (mensajeId) => {
    setMensajes(mensajes.map(msg =>
      msg.id === mensajeId ? { ...msg, expandido: !msg.expandido } : msg
    ));
  };

  // Filtra los mensajes según la categoría seleccionada
  const mensajesFiltrados = filtro === 'todos'
    ? mensajes
    : mensajes.filter(msg => msg.categoria === filtro);

  // Componente para mostrar el indicador de sentimiento
  const IndicadorSentimiento = ({ sentimiento }) => {
    const estilo = {
      positivo: { backgroundColor: '#d4edda', color: '#155724' },
      negativo: { backgroundColor: '#f8d7da', color: '#721c24' },
      neutro: { backgroundColor: '#e2e3e5', color: '#383d41' }
    };
    
    return (
      <span 
        className="indicador-sentimiento" 
        style={estilo[sentimiento] || estilo.neutro}
      >
        {sentimiento === 'positivo' ? '😊 Positivo' : 
         sentimiento === 'negativo' ? '😟 Negativo' : '😐 Neutro'}
      </span>
    );
  };

  // Renderizado del componente
  return (
    <div className="foro-container">
      <h1 className="titulo-foro">Foro de Apoyo Emocional</h1>
      <p className="subtitulo-foro">Comparte anónimamente tus experiencias</p>

      <div className="nuevo-mensaje">
        <textarea
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe tu mensaje anónimo aquí..."
          rows="3"
          disabled={cargando}
        />
        <div className="categoria-selector">
          <label>Foro:</label>
          <select
            value={categoriaMensaje}
            onChange={(e) => setCategoriaMensaje(e.target.value)}
            disabled={cargando}
          >
            <option value="positivo">Emoción Positiva</option>
            <option value="negativo">Emoción Difícil</option>
            <option value="sensible">Tema Sensible</option>
          </select>
        </div>
        <button 
          onClick={publicarMensaje} 
          className="btn-publicar"
          disabled={cargando || !nuevoMensaje.trim()}
        >
          {cargando ? 'Publicando...' : (
            <>
              <span className="icono-publicar">✉️</span> Publicar
            </>
          )}
        </button>
      </div>

      {/* Botones para filtrar los mensajes por categoría */}
      <div className="filtros">
        <button
          onClick={() => setFiltro('todos')}
          className={filtro === 'todos' ? 'activo' : ''}
          disabled={cargando}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro('positivo')}
          className={filtro === 'positivo' ? 'activo' : ''}
          disabled={cargando}
        >
          Emociones Positivas
        </button>
        <button
          onClick={() => setFiltro('negativo')}
          className={filtro === 'negativo' ? 'activo' : ''}
          disabled={cargando}
        >
          Emociones Difíciles
        </button>
        <button
          onClick={() => setFiltro('sensible')}
          className={filtro === 'sensible' ? 'activo' : ''}
          disabled={cargando}
        >
          Temas Sensibles
        </button>
      </div>

      {/* Lista de mensajes filtrados */}
      <div className="lista-mensajes">
        {mensajesFiltrados.map((mensaje) => (
          <div key={mensaje.id} className="mensaje">
            <div className="contenido-mensaje">
              <div className="usuario-anonimo">
                <span className="icono-usuario">👤</span> {mensaje.usuario}
                <IndicadorSentimiento sentimiento={mensaje.sentimiento} />
              </div>
              <p className="texto-mensaje">{mensaje.texto}</p>

              <div className="reacciones">
                {Object.entries(mensaje.reacciones).map(([emoji, count]) => (
                  <span key={emoji} className="reaccion">
                    {emoji} {count}
                  </span>
                ))}
                <div className="opciones-reaccion">
                  {Object.values(EMOJIS).map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => agregarReaccion(mensaje.id, null, emoji)}
                      className="btn-reaccion"
                      disabled={cargando}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón para mostrar/ocultar respuestas */}
              <button
                onClick={() => toggleExpandido(mensaje.id)}
                className="btn-respuestas"
                disabled={cargando}
              >
                {mensaje.respuestas.length} {mensaje.respuestas.length === 1 ? 'respuesta' : 'respuestas'} {mensaje.expandido ? '▲' : '▼'}
              </button>
            </div>

            {/* Sección de respuestas si el mensaje está expandido */}
            {mensaje.expandido && (
              <div className="respuestas">
                {mensaje.respuestas.map((respuesta) => (
                  <div key={respuesta.id} className="respuesta">
                    <div className="usuario-anonimo">
                      <span className="icono-usuario">👤</span> {respuesta.usuario}
                      <IndicadorSentimiento sentimiento={respuesta.sentimiento} />
                    </div>
                    <p className="texto-respuesta">{respuesta.texto}</p>
                    <div className="reacciones-respuesta">
                      {Object.entries(respuesta.reacciones).map(([emoji, count]) => (
                        <span key={emoji} className="reaccion">
                          {emoji} {count}
                        </span>
                      ))}
                      <div className="opciones-reaccion">
                        {[EMOJIS.LIKE, EMOJIS.HEART].map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => agregarReaccion(mensaje.id, respuesta.id, emoji)}
                            className="btn-reaccion"
                            disabled={cargando}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Formulario para añadir una nueva respuesta */}
                <div className="nueva-respuesta">
                  <textarea
                    value={nuevaRespuesta[mensaje.id] || ''}
                    onChange={(e) => setNuevaRespuesta({
                      ...nuevaRespuesta,
                      [mensaje.id]: e.target.value
                    })}
                    placeholder="Escribe tu respuesta..."
                    rows="2"
                    disabled={cargando}
                  />
                  <button
                    onClick={() => agregarRespuesta(mensaje.id)}
                    className="btn-publicar"
                    disabled={cargando || !nuevaRespuesta[mensaje.id]?.trim()}
                  >
                    {cargando ? 'Enviando...' : (
                      <>
                        <span className="icono-publicar">✉️</span> Responder
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foros;