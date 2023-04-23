import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/button.css'
import './styles/checkbox.css'
import './styles/commons.css'
import './styles/ingredients.css'
import './styles/media.css'
import './styles/popup.css'
import './styles/checkout.css'
import './styles/header.css'

/**
 * Se importan todos los estilos en un unico lugar para facilitar trabajo.
 * Obtenemos el elemento del documento HTML sobre el cual queremos renderizar todos los componentes.
 * Ejecutamos el metodo render indicando el punto de entrada (App)
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
