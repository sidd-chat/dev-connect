import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AuthProvider } from './context/AuthContext'

import './index.css'
import App from './App.jsx'
import { SnippetsProvider } from './context/SnippetsContext'

createRoot(document.getElementById('root')).render(
  <SnippetsProvider>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </SnippetsProvider>,
)
