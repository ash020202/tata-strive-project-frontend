import { useState } from "react";
import { NavLink } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  onCartClick: () => void;
  onAuthClick: () => void;
}

export function Navbar({ onCartClick, onAuthClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, userData } = useAuth();
  const { items } = useCart();
  // console.log(userData?.roles.includes("ROLE_ADMIN"));
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { path: "/", label: "Menu" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/reservations", label: "Reservations" },
  ];

  const authItems = [
    { path: "/orders", label: "Orders" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md ">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center text-orange-500">
              <UtensilsCrossed className="w-8 h-8" />
              <span className="hidden ml-2 text-xl font-semibold text-gray-900 sm:block">
                Gourmet Haven
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-1 md:flex">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-orange-50 text-orange-500"
                      : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {userData?.roles.includes("ROLE_ADMIN") && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
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
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-orange-50 text-orange-500"
                        : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))
            ) : (
              <button
                onClick={onAuthClick}
                className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-orange-500 hover:bg-orange-50"
              >
                Login
              </button>
            )}

            <CartButton count={cartItemsCount} onClick={onCartClick} />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <CartButton count={cartItemsCount} onClick={onCartClick} />
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              navItems={navItems}
              userData={userData}
              authItems={authItems}
              isAuthenticated={!!isAuthenticated}
              onAuthClick={onAuthClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
