import React from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { UserData } from "../../contexts/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  navItems: Array<{ path: string; label: string }>;
  authItems?: Array<{ path: string; label: string }>;
  isAuthenticated: boolean;
  userData: UserData | null;
  onAuthClick: () => void;
}

export function MobileMenu({
  isOpen,
  onToggle,
  navItems,
  authItems = [],
  isAuthenticated,
  userData,
  onAuthClick,
}: MobileMenuProps) {
  return (
    <div className="md:hidden">
      <button
        onClick={onToggle}
        className="p-2 text-gray-600 hover:text-orange-500"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-orange-50 text-orange-500"
                      : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                  }`
                }
                onClick={onToggle}
              >
                {label}
              </NavLink>
            ))}
            {userData?.roles.includes("ROLE_ADMIN") && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-orange-50 text-orange-500"
                      : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                  }`
                }
              >
                Admin
              </NavLink>
            )}

            {isAuthenticated ? (
              authItems.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-orange-50 text-orange-500"
                        : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                    }`
                  }
                  onClick={onToggle}
                >
                  {label}
                </NavLink>
              ))
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  onToggle();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
