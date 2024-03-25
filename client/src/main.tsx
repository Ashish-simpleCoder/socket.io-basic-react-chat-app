import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <>
      <Toaster richColors />
      <App />
   </>
)
