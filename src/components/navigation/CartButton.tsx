import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  count: number;
  onClick: () => void;
}

export function CartButton({ count, onClick }: CartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
    >
      <ShoppingCart className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}