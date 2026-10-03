import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Global styles for all toasts
          style: {
            background: '#f4f1eb',
            color: '#4a3b32',
            border: '1px solid #e2ddd5',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '12px',
            fontFamily: 'inherit',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
          // Custom styles specifically for success toasts
          success: {
            iconTheme: {
              primary: '#ff6b00',
              secondary: '#fff',
            },
          },
          // Custom styles specifically for error toasts
          error: {
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fecaca',
            },
          },
        }}
      />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
