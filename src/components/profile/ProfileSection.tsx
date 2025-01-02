import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

export function ProfileSection() {
  const { logout, userData } = useAuth();
  const { clearCart } = useCart();

  if (!userData) {
    return <Navigate to="/" />;
  }
  function logoutHandler() {
    logout();
    clearCart();
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-orange-100 rounded-full">
            <User className="w-6 h-6 text-orange-500" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{userData.username}</h2>
            <p className="text-gray-500">{userData.email}</p>
          </div>
        </div>
        <button
          onClick={logoutHandler}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <LogOut className="w-5 h-5 mr-1" />
          Logout
        </button>
      </div>

      <div className="pt-6 border-t">
        <h3 className="mb-4 font-semibold">Account Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-50">
            <span className="text-gray-500">Total Orders</span>
            {/* <p className="text-2xl font-semibold">{userData.orders.length}</p> */}
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <span className="text-gray-500">Active Orders</span>
            {/* <p className="text-2xl font-semibold">
              {
                userData.orders.filter((order) =>
                  ['pending', 'confirmed', 'preparing'].includes(order.status)
                ).length
              }
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
