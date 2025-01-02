import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  active?: boolean;
}

export function NavLink({ icon: Icon, label, onClick, active }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
        active
          ? 'text-orange-500 bg-orange-50'
          : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}