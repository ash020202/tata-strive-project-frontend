import { useEffect, useState } from 'react';
import { MenuItem } from '../components/MenuItem';
import { useCart } from '../contexts/CartContext';
import { getAllFoodItems } from '../service/userService';
import { MenuItems } from '../types';
import Loader from '../components/common/Loader';

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();
  const [foodItems, setFoodItems] = useState<MenuItems[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAllFoodItems = async () => {
      try {
        const response = await getAllFoodItems();
        setFoodItems(response.data);
      } catch (error) {
        // console.error('Error fetching food items:', error);
        setError('Unable to fetch food items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllFoodItems();
  }, []);

  const categories = [
    'all',
    ...new Set(foodItems.map((item) => item.category)),
  ];

  const filteredItems = foodItems.filter(
    (item) =>
      item.isAvailable &&
      (selectedCategory === 'all' || item.category === selectedCategory)
  );

  if(isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center"><Loader /></p>
      </div>)
  }

    if(error) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-center text-red-500 text-lg font-semibold capitalize">{error}</p>
        </div>
      )
    }
  return (
    <div className="pt-24 pb-16">
      <h1 className="mb-8 text-4xl font-bold text-center text-gray-900">
        Our Menu
      </h1>

      <div className="flex justify-center gap-4 mb-8 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full capitalize whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-center">Loading food items...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MenuItem key={item.id} item={item} onAddToCart={addToCart} />
            ))
          ) : (
            <p className="text-center">No items available in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}
