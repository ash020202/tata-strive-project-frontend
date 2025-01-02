import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { Cart } from './components/cart/Cart';
import { AuthModal } from './components/auth/AuthModal';
import { Toaster } from 'sonner';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {!location.pathname.match(/\/admin(\/|$)/) && (
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          onAuthClick={() => setIsAuthOpen(true)}
        />
      )}

      <main
        className={` mx-auto  ${
          !location.pathname.match(/\/admin(\/|$)/)
            ? 'lg:px-8 px-4 sm:px-6 max-w-7xl '
            : ' '
        }`}
      >
        <Outlet />
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
