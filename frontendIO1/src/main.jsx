import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AulaForm from './components/AulaForm.jsx'
import React from 'react';


createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <App />
  </React.StrictMode>,
)
