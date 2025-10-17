import './App.css'

<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Reminder Dashboard</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            + New Reminder
          </Link>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
