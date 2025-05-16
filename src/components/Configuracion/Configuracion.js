/*
Nombre del programa:
FeelConnect - Configuración de Suscripción

¿Para qué sirve el programa?
La pantalla de configuración que permite a los usuarios elegir un plan de suscripción 
para eliminar anuncios, introducir datos de pago y completar el proceso de compra. 
Simula procesamiento de pago y confirma la adquisición del plan.

Autores:
Kelly Estefany Hernández Bandala  
Araceli Hernández García

Fecha de creación:
10/05/2025

Fecha de entrega:
16/05/2025
*/

import React, { useState } from 'react';
import './Configuracion.css';
import Swal from 'sweetalert2';

const Configuracion = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 1,
      name: "Semanal",
      price: "$100",
      description: "Pago recurrente mensual",
      savings: "",
      highlight: false
    },
    {
      id: 2,
      name: "Mensual",
      price: "500",
      description: "Pago anual (2 meses gratis)",
      savings: "Ahorras $10 vs mensual",
      highlight: true
    },
    {
      id: 3,
      name: "Anual",
      price: "$2000",
      description: "Un solo pago para siempre",
      savings: "Mejor relación calidad-precio",
      highlight: false
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      Swal.fire({
        title: '¡Pago Exitoso!',
        text: `Has adquirido el plan ${selectedPlan.name} correctamente.`,
        icon: 'success',
        confirmButtonColor: '#C97B84',
        confirmButtonText: 'Continuar',
        background: '#FFF9F9'
      }).then(() => {
        setSelectedPlan(null);
        setPaymentMethod('');
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
      });
    }, 2000);
  };

  return (
    <div className="contenido-configuracion">
      <h1>Eliminar Anuncios</h1>
      
      {!selectedPlan ? (
        <div className="configuracion-card">
          <h2>Selecciona tu plan</h2>
          <p className="plan-subtitle">Elige cómo quieres disfrutar sin anuncios</p>
          
          <div className="plans-container-vertical">
            {plans.map(plan => (
              <div 
                key={plan.id} 
                className={`plan-card ${plan.highlight ? 'highlight-plan' : ''}`}
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.highlight && <div className="popular-badge">POPULAR</div>}
                <div className="plan-content">
                  <h3>{plan.name}</h3>
                  <p className="plan-price">{plan.price}</p>
                  <p className="plan-desc">{plan.description}</p>
                  {plan.savings && <p className="plan-savings">{plan.savings}</p>}
                </div>
                <button className="select-plan-btn">Seleccionar</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="payment-card">
          <h2>Completa tu pago</h2>
          <p className="selected-plan-info">
            Plan <strong>{selectedPlan.name}</strong> - {selectedPlan.price}
          </p>
          
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="config-item">
              <label>Método de Pago</label>
              <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Seleccionar</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
              </select>
            </div>
            
            <div className="config-item">
              <label>Número de Tarjeta</label>
              <input 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            
            <div className="config-row">
              <div className="config-item">
                <label>Fecha de Expiración</label>
                <input 
                  type="text" 
                  placeholder="MM/AA" 
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="config-item">
                <label>CVV</label>
                <input 
                  type="text" 
                  placeholder="123" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="payment-actions">
              <button 
                type="button" 
                className="back-button"
                onClick={() => setSelectedPlan(null)}
              >
                Cambiar plan
              </button>
              <button 
                type="submit" 
                disabled={isProcessing} 
                className="payment-button"
              >
                {isProcessing ? 'Procesando...' : `Pagar ${selectedPlan.price}`}
              </button>
            </div>
            
            <p className="payment-note">
              Al hacer clic en Pagar, aceptas los Términos de Servicio y la Política de Privacidad.
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Configuracion;