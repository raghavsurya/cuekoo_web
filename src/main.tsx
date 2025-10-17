import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import CreateReminder from "./pages/CreateReminder";
import Dashboard from "./pages/Dashboard";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateReminder />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
