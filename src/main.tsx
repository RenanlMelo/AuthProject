import { createRoot } from 'react-dom/client'
import './main.css'

import { BrowserRouter  } from "react-router-dom"
import MainRouter from "./routes"

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <MainRouter />    
    </BrowserRouter>
)
