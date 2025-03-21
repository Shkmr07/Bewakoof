import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider as UiProvider } from './components/ui/provider'

createRoot(document.getElementById('root')).render(
  <UiProvider>
    <App />
  </UiProvider>,
)
