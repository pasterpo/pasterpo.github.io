import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context/AppContext'
import './styles/variables.css'
import './styles/brand.css'
import './styles/base.css'
import './styles/toolbar.css'
import './styles/sidebar.css'
import './styles/editor.css'
import './styles/preview.css'
import './styles/workspace.css'
import './styles/dashboard.css'
import './styles/help.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
