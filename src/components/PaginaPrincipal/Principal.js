/*
Nombre del archivo:
FeelConnect - Sección Principal

¿Para qué sirve este archivo?
Define la lógica y la interfaz de la sección principal de la plataforma FeelConnect. 
Permite al usuario registrar sus emociones diarias, guardar entradas de diario, 
y visualizar un calendario con días registrados.

Autores:
Kelly Estefany Hernández Bandala  
Araceli Hernández García

Fecha de creación:
29/04/2025

Fecha de entrega:
16/05/2025
*/

import React, { useState, useEffect } from 'react';
  import Swal from 'sweetalert2';
  import { useNavigate } from 'react-router-dom';
  import './Principal.css';

  const Principal = () => {
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(3);
    const [journalEntry, setJournalEntry] = useState('');
    const [savedEntries, setSavedEntries] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dailyMessage, setDailyMessage] = useState('');
    const navigate = useNavigate();

    const emotions = [
      { name: 'Felicidad', emoji: '😊', gradient: 'linear-gradient(135deg, #FFD166 0%, #F6B352 100%)' },
      { name: 'Tristeza', emoji: '😢', gradient: 'linear-gradient(135deg, #6BD5E1 0%, #48B1BF 100%)' },
      { name: 'Enojo', emoji: '😠', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)' },
      { name: 'Calma', emoji: '😌', gradient: 'linear-gradient(135deg, #51CF66 0%, #82DD97 100%)' },
      { name: 'Ansiedad', emoji: '😰', gradient: 'linear-gradient(135deg, #A78BFA 0%, #C4B0FF 100%)' },
      { name: 'Energía', emoji: '⚡', gradient: 'linear-gradient(135deg, #F06595 0%, #FF8FAD 100%)' }
    ];

    const messages = [
      "Tus emociones son válidas e importantes",
      "Reconocer cómo te sientes es un acto de valentía",
      "Cada emoción es un mensaje de tu interior",
      "Hoy es un buen día para ser amable contigo mismo",
      "Permítete sentir sin juicios",
      "Tu bienestar emocional es una prioridad"
    ];

    useEffect(() => {
      const idUsuario = localStorage.getItem('usuarioId');
      const aliasUsuario = localStorage.getItem('usuarioAlias');
      if (!idUsuario || !aliasUsuario) navigate('/login');
    }, [navigate]);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const handleSaveEntry = async () => {
      if (!selectedEmotion) return;

      const usuarioId = localStorage.getItem('usuarioId');
      const alias = localStorage.getItem('usuarioAlias');
      const fecha = formatDate(new Date());

      Swal.fire({
        title: '¿Guardar registro?',
        text: `Vas a registrar que hoy te sientes ${selectedEmotion.name.toLowerCase()} (${currentLevel}/5)`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#A78B7D',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
        background: '#F8F1E9',
        color: '#5A4A42'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const diario = {
            emocion: selectedEmotion.name,
            descripcion: journalEntry,
            intensidad: currentLevel,
            idUsuario: usuarioId,
            fecha: fecha
          };

          try {
            const response = await fetch('http://localhost:8080/Diario', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(diario),
            });

            if (response.ok) {
              setSavedEntries([...savedEntries, diario]);
              setJournalEntry('');
              setSelectedEmotion(null);
              setCurrentLevel(3);

              Swal.fire({
                title: '¡Registro guardado!',
                text: `Se guardó tu registro con éxito. Alias: ${alias}`,
                icon: 'success',
                confirmButtonColor: '#A78B7D',
                background: '#F8F1E9',
                color: '#5A4A42'
              });
            } else {
              Swal.fire({
                title: 'Error al guardar',
                text: 'Hubo un problema al guardar tu registro.',
                icon: 'error',
                confirmButtonColor: '#d33',
                background: '#F8F1E9',
                color: '#5A4A42'
              });
            }
          } catch (error) {
            Swal.fire({
              title: 'Error de conexión',
              text: 'No se pudo conectar con el servidor.',
              icon: 'error',
              confirmButtonColor: '#d33',
              background: '#F8F1E9',
              color: '#5A4A42'
            });
          }
        }
      });
    };

    const renderCalendar = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const days = [];
      const today = new Date();

      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEntry = savedEntries.some(entry => entry.fecha === dateStr);
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

        days.push(
          <div 
            key={`day-${day}`} 
            className={`calendar-day ${isToday ? 'today' : ''}`}
            onClick={() => setCurrentDate(new Date(year, month, day))}
          >
            {day}
            {hasEntry && <div className="checkmark">✓</div>}
            {isToday && <div className="today-marker"></div>}
          </div>
        );
      }

      return days;
    };

    const EmotionLevelSelector = () => (
      <div className="level-selector">
        <p>Intensidad: {currentLevel}/5</p>
        <div className="level-bars">
          {[1, 2, 3, 4, 5].map((level) => (
            <div 
              key={level}
              className={`level-bar ${currentLevel >= level ? 'active' : ''}`}
              onClick={() => setCurrentLevel(level)}
              style={{ 
                background: selectedEmotion?.gradient,
                opacity: currentLevel >= level ? 1 : 0.3
              }}
            />
          ))}
        </div>
      </div>
    );

    return (
      <div className="contenido-principal">
        <div className="content-wrapper">
          <h1 className="welcome-title">Registro Emocional</h1>
          <div className="dashboard-container">
            <div className="calendar-panel">
              {/* Header y calendario */}
              <div className="calendar-header">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
                  &lt;
                </button>
                <h3>
                  {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </h3>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
                  &gt;
                </button>
              </div>
              <div className="calendar-grid">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                  <div key={day} className="calendar-weekday">{day}</div>
                ))}
                {renderCalendar()}
              </div>
              <div className="calendar-legend">
                <div className="legend-item"><div className="checkmark">✓</div><span>Día registrado</span></div>
                <div className="legend-item"><div className="today-marker"></div><span>Hoy</span></div>
              </div>
            </div>

            <div className="emotion-panel">
              <div className="principal-card">
                <div className="daily-affirmation"><p>"{dailyMessage}"</p></div>
                <h2 className="question-text">¿Cómo te sientes hoy?</h2>
                <div className="emotion-selector">
                  {emotions.map((emotion) => (
                    <button
                      key={emotion.name}
                      className={`emotion-btn ${selectedEmotion?.name === emotion.name ? 'selected' : ''}`}
                      style={{ background: emotion.gradient }}
                      onClick={() => setSelectedEmotion(emotion)}
                    >
                      {emotion.emoji} {emotion.name}
                    </button>
                  ))}
                </div>

                {selectedEmotion && (
                  <>
                    <EmotionLevelSelector />
                    <div className="journal-section">
                      <textarea
                        value={journalEntry}
                        onChange={(e) => setJournalEntry(e.target.value)}
                        placeholder={`Describe qué te hace sentir ${selectedEmotion.name.toLowerCase()}...`}
                        className="journal-input"
                      />
                      <button 
                        onClick={handleSaveEntry}
                        className="save-button"
                        style={{ background: selectedEmotion.gradient }}
                      >
                        Guardar Registro
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Principal;
