import React from 'react';
import { MenuItem } from '../components/MenuItem';
import { menuItems } from '../data/menu';
import type { MenuItem as MenuItemType } from '../types';

interface HomeProps {
  onAddToCart: (item: MenuItemType) => void;
}

export function Home({ onAddToCart }: HomeProps) {
  return (
    <div className="pt-24 pb-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Our Menu
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}