import { OrderItem } from '../../contexts/AuthContext';

interface OrderCardProps {
  order: OrderItem;
}

export function OrderCard({ order }: OrderCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-purple-100 text-purple-800',
    ready: 'bg-green-100 text-green-800',
    delivered: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-sm text-gray-500">Order ID: {order.id}</span>
          <p className="mt-1 text-lg font-semibold">
            ${order.totalPrice.toFixed(2)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            statusColors[order.status]
          }`}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2">
        {order.foodItemList.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.quantity}x {item.name}
            </span>
            <span className="text-gray-600">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* <div className="pt-4 mt-4 border-t">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Delivery to: {order.address}
        </p>
        {order.notes && (
          <p className="mt-2 text-sm text-gray-500">Notes: {order.notes}</p>
        )}
      </div> */}
    </div>
  );
}
