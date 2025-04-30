import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Principal.css';

const Principal = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(3);
  const [journalEntry, setJournalEntry] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyMessage, setDailyMessage] = useState('');

  // Emociones con gradientes
  const emotions = [
    { name: 'Felicidad', emoji: '😊', gradient: 'linear-gradient(135deg, #FFD166 0%, #F6B352 100%)' },
    { name: 'Tristeza', emoji: '😢', gradient: 'linear-gradient(135deg, #6BD5E1 0%, #48B1BF 100%)' },
    { name: 'Enojo', emoji: '😠', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)' },
    { name: 'Calma', emoji: '😌', gradient: 'linear-gradient(135deg, #51CF66 0%, #82DD97 100%)' },
    { name: 'Ansiedad', emoji: '😰', gradient: 'linear-gradient(135deg, #A78BFA 0%, #C4B0FF 100%)' },
    { name: 'Energía', emoji: '⚡', gradient: 'linear-gradient(135deg, #F06595 0%, #FF8FAD 100%)' }
  ];

  // Mensajes inspiradores
  const messages = [
    "Tus emociones son válidas e importantes",
    "Reconocer cómo te sientes es un acto de valentía",
    "Cada emoción es un mensaje de tu interior",
    "Hoy es un buen día para ser amable contigo mismo",
    "Permítete sentir sin juicios",
    "Tu bienestar emocional es una prioridad"
  ];

  // Efecto para mensaje del día
  useEffect(() => {
    const today = new Date().getDate();
    setDailyMessage(messages[today % messages.length]);
  }, []);

  // Guardar registro emocional con confirmación
  const handleSaveEntry = () => {
    if (!selectedEmotion) return;

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
    }).then((result) => {
      if (result.isConfirmed) {
        const newEntry = {
          emotion: selectedEmotion,
          level: currentLevel,
          journal: journalEntry,
          date: currentDate.toISOString().split('T')[0]
        };

        setSavedEntries([...savedEntries, newEntry]);
        setJournalEntry('');
        setSelectedEmotion(null);
        setCurrentLevel(3);

        Swal.fire({
          title: '¡Registro guardado!',
          icon: 'success',
          confirmButtonColor: '#A78B7D',
          background: '#F8F1E9',
          color: '#5A4A42'
        });
      }
    });
  };

  // Renderizar calendario
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    const today = new Date();
    
    // Días vacíos al inicio
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month + 1}-${day}`;
      const hasEntry = savedEntries.some(entry => entry.date === dateStr);
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

  // Selector de nivel emocional
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
          {/* Panel izquierdo - Calendario */}
          <div className="calendar-panel">
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
              <div className="legend-item">
                <div className="checkmark">✓</div>
                <span>Día registrado</span>
              </div>
              <div className="legend-item">
                <div className="today-marker"></div>
                <span>Hoy</span>
              </div>
            </div>
          </div>
          
          {/* Panel derecho - Registro emocional */}
          <div className="emotion-panel">
            <div className="principal-card">
              <div className="daily-affirmation">
                <p>"{dailyMessage}"</p>
              </div>
              
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