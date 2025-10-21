import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import CreateReminder from "./pages/CreateReminder";
import Dashboard from "./pages/Dashboard";
import App from './App'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 👈 Layout component
    children: [
      {
        index: true, // "/" route
        element: <Dashboard />,
      },
      {
        path: "create",
        element: <CreateReminder />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);