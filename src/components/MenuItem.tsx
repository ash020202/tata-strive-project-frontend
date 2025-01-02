import { Plus } from 'lucide-react';
import type { MenuItems as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
}

export function MenuItem({ item, onAddToCart }: MenuItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <span className="text-orange-500 font-semibold">${item.price}</span>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
        <button
          onClick={() => onAddToCart(item)}
          className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}