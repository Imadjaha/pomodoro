import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { TimerProvider } from './context/TimerContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimerProvider>
    <App />
    </TimerProvider>
  </StrictMode>,
)
