/*
Nombre del programa:
FeelConnect - Componente de Foros

¿Para qué sirve este archivo?
Este componente permite a los usuarios compartir experiencias emocionales
de forma anónima, reaccionar con emojis y responder a otros mensajes.
Fomenta un espacio seguro de apoyo emocional dentro de la comunidad.

Autores:
Kelly Estefany Hernández Bandala  
Araceli Hernández García

Fecha de creación:
29/04/2025

Fecha de entrega:
16/05/2025
*/

import React, { useState } from 'react';
import './Foros.css';

const EMOJIS = {
  LIKE: '👍',
  HEART: '❤️',
  SMILE: '😊',
  THINK: '🤔'
};

const generateRandomUsername = () => {
  const adjectives = ['Anónimo', 'Misterioso', 'Secreto', 'Silencioso', 'Invisible', 'Oculto', 'Desconocido', 'Misterioso'];
  const nouns = ['Amigo', 'Visitante', 'Usuario', 'Participante', 'Colaborador', 'Explorador', 'Viajero', 'Soñador'];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdj} ${randomNoun} ${Math.floor(1000 + Math.random() * 9000)}`;
};

const Foros = () => {
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      texto: "¿Alguien ha probado la técnica de respiración 4-7-8 para la ansiedad?",
      categoria: "negativo",
      reacciones: { [EMOJIS.LIKE]: 5, [EMOJIS.HEART]: 3, [EMOJIS.SMILE]: 2 },
      respuestas: [
        {
          id: 101,
          texto: "Sí, a mí me funciona bastante bien antes de dormir",
          reacciones: { [EMOJIS.LIKE]: 2 },
          usuario: generateRandomUsername()
        },
        {
          id: 102,
          texto: "Prefiero la meditación guiada personalmente",
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
      reacciones: { [EMOJIS.HEART]: 7, [EMOJIS.SMILE]: 4 },
      respuestas: [],
      expandido: false,
      usuario: generateRandomUsername()
    },
    {
      id: 3,
      texto: "Estoy lidiando con ataques de pánico recientemente, ¿algún consejo?",
      categoria: "sensible",
      reacciones: { [EMOJIS.HEART]: 9, [EMOJIS.THINK]: 3 },
      respuestas: [
        {
          id: 103,
          texto: "A mí me ayudó mucho buscar ayuda profesional, no estás solo/a",
          reacciones: { [EMOJIS.HEART]: 4 },
          usuario: generateRandomUsername()
        },
        {
          id: 104,
          texto: "Respiración profunda y contar objetos alrededor me ha servido",
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
      reacciones: { [EMOJIS.HEART]: 6, [EMOJIS.LIKE]: 2 },
      respuestas: [
        {
          id: 105,
          texto: "Terapia cognitivo-conductual puede ser muy útil para esto",
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

  const publicarMensaje = () => {
    if (nuevoMensaje.trim()) {
      const nuevo = {
        id: Date.now(),
        texto: nuevoMensaje,
        categoria: categoriaMensaje,
        reacciones: {},
        respuestas: [],
        expandido: false,
        usuario: generateRandomUsername()
      };
      setMensajes([nuevo, ...mensajes]);
      setNuevoMensaje('');
    }
  };

  const agregarRespuesta = (mensajeId) => {
    if (nuevaRespuesta[mensajeId]?.trim()) {
      const respuesta = {
        id: Date.now(),
        texto: nuevaRespuesta[mensajeId],
        reacciones: {},
        usuario: generateRandomUsername()
      };

      setMensajes(mensajes.map(msg =>
        msg.id === mensajeId
          ? { ...msg, respuestas: [...msg.respuestas, respuesta], expandido: true }
          : msg
      ));
      setNuevaRespuesta({ ...nuevaRespuesta, [mensajeId]: '' });
    }
  };

  const agregarReaccion = (mensajeId, respuestaId, emoji) => {
    setMensajes(mensajes.map(msg => {
      if (msg.id === mensajeId) {
        if (!respuestaId) {
          const nuevasReacciones = { ...msg.reacciones };
          nuevasReacciones[emoji] = (nuevasReacciones[emoji] || 0) + 1;
          return { ...msg, reacciones: nuevasReacciones };
        } else {
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

  const toggleExpandido = (mensajeId) => {
    setMensajes(mensajes.map(msg =>
      msg.id === mensajeId ? { ...msg, expandido: !msg.expandido } : msg
    ));
  };

  const mensajesFiltrados = filtro === 'todos'
    ? mensajes
    : mensajes.filter(msg => msg.categoria === filtro);

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
        />
        <div className="categoria-selector">
          <label>Categoría:</label>
          <select
            value={categoriaMensaje}
            onChange={(e) => setCategoriaMensaje(e.target.value)}
          >
            <option value="positivo">Emoción Positiva</option>
            <option value="negativo">Emoción Difícil</option>
            <option value="sensible">Tema Sensible</option>
          </select>
        </div>
        <button onClick={publicarMensaje} className="btn-publicar">
          <span className="icono-publicar">✉️</span> Publicar
        </button>
      </div>

      <div className="filtros">
        <button
          onClick={() => setFiltro('todos')}
          className={filtro === 'todos' ? 'activo' : ''}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro('positivo')}
          className={filtro === 'positivo' ? 'activo' : ''}
        >
          Emociones Positivas
        </button>
        <button
          onClick={() => setFiltro('negativo')}
          className={filtro === 'negativo' ? 'activo' : ''}
        >
          Emociones Difíciles
        </button>
        <button
          onClick={() => setFiltro('sensible')}
          className={filtro === 'sensible' ? 'activo' : ''}
        >
          Temas Sensibles
        </button>
      </div>

      <div className="lista-mensajes">
        {mensajesFiltrados.map((mensaje) => (
          <div key={mensaje.id} className="mensaje">
            <div className="contenido-mensaje">
              <div className="usuario-anonimo">
                <span className="icono-usuario">👤</span> {mensaje.usuario}
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
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => toggleExpandido(mensaje.id)}
                className="btn-respuestas"
              >
                {mensaje.respuestas.length} {mensaje.respuestas.length === 1 ? 'respuesta' : 'respuestas'} {mensaje.expandido ? '▲' : '▼'}
              </button>
            </div>

            {mensaje.expandido && (
              <div className="respuestas">
                {mensaje.respuestas.map((respuesta) => (
                  <div key={respuesta.id} className="respuesta">
                    <div className="usuario-anonimo">
                      <span className="icono-usuario">👤</span> {respuesta.usuario}
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
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="nueva-respuesta">
                  <textarea
                    value={nuevaRespuesta[mensaje.id] || ''}
                    onChange={(e) => setNuevaRespuesta({
                      ...nuevaRespuesta,
                      [mensaje.id]: e.target.value
                    })}
                    placeholder="Escribe tu respuesta..."
                    rows="2"
                  />
                  <button
                    onClick={() => agregarRespuesta(mensaje.id)}
                    className="btn-publicar"
                  >
                    <span className="icono-publicar">✉️</span> Responder
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
