import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface NavLogoProps {
  onClick: () => void;
}

export function NavLogo({ onClick }: NavLogoProps) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center hover:text-orange-500 transition-colors"
    >
      <UtensilsCrossed className="h-8 w-8 text-orange-500" />
      <span className="ml-2 text-xl font-semibold">Gourmet Haven</span>
    </button>
  );
}