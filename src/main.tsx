//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TimerProvider } from './contexts/useTimerContext.tsx'
import { GlobalProvider } from './contexts/useGlobalContext.tsx'
import { MousePositionProvider } from './contexts/useMousePositionContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <GlobalProvider>
    <MousePositionProvider>
      <TimerProvider>
        <App />
      </TimerProvider>

    </MousePositionProvider>
  </GlobalProvider>


  // </React.StrictMode>,
)
