import React from 'react';
import { ClipboardList, User } from 'lucide-react';
import { NavLogo } from './navigation/NavLogo';
import { NavLink } from './navigation/NavLink';
import { CartButton } from './navigation/CartButton';
import type { User as UserType } from '../types';

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
  user: UserType | null;
  onProfileClick: () => void;
  onOrdersClick: () => void;
  onHomeClick: () => void;
  onAuthClick: () => void;
  currentPage: string;
}

export function Navbar({
  cartItemsCount,
  onCartClick,
  user,
  onProfileClick,
  onOrdersClick,
  onHomeClick,
  onAuthClick,
  currentPage
}: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLogo onClick={onHomeClick} />

          <div className="flex items-center gap-2">
            <NavLink
              icon={ClipboardList}
              label="Menu"
              onClick={onHomeClick}
              active={currentPage === 'menu'}
            />
            
            {user ? (
              <>
                <NavLink
                  icon={ClipboardList}
                  label="Orders"
                  onClick={onOrdersClick}
                  active={currentPage === 'orders'}
                />
                <NavLink
                  icon={User}
                  label={user.name}
                  onClick={onProfileClick}
                  active={currentPage === 'profile'}
                />
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="text-gray-600 hover:text-orange-500 transition-colors px-3 py-2"
              >
                Login
              </button>
            )}
            
            <CartButton count={cartItemsCount} onClick={onCartClick} />
          </div>
        </div>
      </div>
    </nav>
  );
}