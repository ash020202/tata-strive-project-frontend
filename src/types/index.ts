export interface MenuItems {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  isAvailable: boolean;
  
}

export interface CartItem extends MenuItems {
  quantity: number;
}

// export interface Order {
//   id: string;
//   items: CartItem[];
//   total: number;
//   status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
//   createdAt: string;
//   address: string;
//   notes?: string;
// }
export interface FoodItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

export interface Order {
  email: string;
  foodItemList: FoodItem[];
  id: number;
  status: string;
  totalPrice: number;
  username: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  orders: Order[];
}

export interface Food {
  id?: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  isAvailable: boolean;
}

export interface Reservation {
  id: string;
  date: string;
  guests: string;
  occasion: string;
  time: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}