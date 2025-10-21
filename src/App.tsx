import { Navbar } from "./components/Navbar";
import './App.css'

<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
       <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
