/*
  Nombre del programa:
  FeelConnect - Componente ChatbotIframe

  ¿Para qué sirve este archivo?
  Carga e integra el chatbot de Dialogflow mediante un iframe, permitiendo
  la interacción del usuario con el asistente virtual en la aplicación.

  Autores:
  Kelly Estefany Hernández Bandala  
  Araceli Hernández García

  Fecha de creación:
  14/05/2025

  Fecha de entrega:
  16/05/2025
*/

import React, { useEffect } from 'react';

const ChatbotIframe = () => {
  useEffect(() => {
    if (!document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <df-messenger
      
      chat-title="FeelConnect"
      agent-id="576df958-212d-4eeb-967c-0cdb482a5325"
      language-code="en"
      style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
    ></df-messenger>
  );
};

export default ChatbotIframe;
