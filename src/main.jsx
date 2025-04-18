import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
<<<<<<< HEAD
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
=======
import { RouterProvider } from 'react-router'
import router from './router'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
>>>>>>> pages
  </StrictMode>,
)
