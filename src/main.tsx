import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import CreateReminder from "./pages/CreateReminder";
import Dashboard from "./pages/Dashboard";
import App from './App'
import LoginPage from "./pages/LoginPage";


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
        path: "dashboard", // "/" route
        element: <Dashboard />,
      },
      {
        path: "create",
        element: <CreateReminder />,
      },
        {
          path: "login",
          element: <LoginPage />,
        },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);