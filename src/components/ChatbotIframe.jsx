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
      
      chat-title="Kelly2"
      agent-id="576df958-212d-4eeb-967c-0cdb482a5325"
      language-code="en"
      style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
    ></df-messenger>
  );
};

export default ChatbotIframe;
