import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const root = document.getElementById('root')!
const app = <StrictMode><BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></BrowserRouter></StrictMode>
// Pages are already built as real HTML, so the browser only has to attach to them (no blank flash, nothing re-drawn).
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
