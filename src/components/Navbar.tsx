import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for icons (install below)

export function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Reminders", path: "/reminders" },
    { name: "Create", path: "/create" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/cuekoo.svg"
              alt="Logo"
              className="h-15 w-15 invert-[0.6] sepia-[1] saturate-[2] hue-rotate-[270deg]"
            />
            <span className="font-bold text-lg text-gray-800">RemindrApp</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-2 py-1 rounded text-sm font-medium ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/create"
              onClick={() => setOpen(false)}
              className="block bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-lg font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
