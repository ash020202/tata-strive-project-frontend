import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { getAllOrders } from "../service/adminService";
import { Order } from "../types";
import Loader from "../components/common/Loader";


const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        // console.log("Fetched Orders:", response); // Debug log to see the response
        if (Array.isArray(response)) {
          setOrders(response);
          // console.log("Orders:", orders);
          
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        setError("No Orders Found");
        // console.error("Error fetching orders:", error); // Debug log to see the error
      } 
      finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // const updateOrderStatus = (orderId: string, status: "accepted" | "rejected") => {
  //   setOrders(
  //     orders.map((order) =>
  //       order.id === orderId ? { ...order, status } : order
  //     )
  //   );
  // };

  if (loading) {
    return <div className="flex items-center justify-center h-[100dvh]"><Loader /></div>; // Show loading text or spinner while data is being fetched
  }

  if (error) {
    return <div className="flex items-center justify-center h-[100dvh] text-red-500 text-lg font-semibold capitalize">{error}</div>; // Show error message if fetching fails
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div>No orders available</div> // Show message if no orders are fetched
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600">
                    {order.username} - {order.email}
                  </p>
                  {/* <p className="text-sm text-gray-500">{order.date}</p> */}
                </div>
                <div className="space-y-4">
                  {order.status === "pending" && (
                    <div className="flex space-x-2">
                      <button
                        
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        // onClick={() => updateOrderStatus(order.id, "rejected")}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                  {order.status !== "pending" && (
                    <div
                      className={`px-3 py-1 rounded ${
                        order.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Order Items:</h4>
                <ul className="space-y-2">
                {order.foodItemList.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div>
                    <p>₹{item.price}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </li>
              ))}
                </ul>
                <div className="mt-4 text-right">
                  <span className="font-bold">Total: ₹{order.totalPrice}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
