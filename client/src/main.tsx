import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import {AuthProvider} from './contexts/AuthProvider.tsx'
import { CartProvider } from './contexts/ProductProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <AuthProvider>
    <CartProvider>
          <App />      
    </CartProvider>
  </AuthProvider>
  </BrowserRouter>

)
