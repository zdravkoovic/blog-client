import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routeDefinitions } from './Routes/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routeDefinitions)} />
  </StrictMode>,
)
