import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { formatINR } from "../utils/currency";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-900 text-yellow-300",
      processing: "bg-blue-900 text-blue-300",
      shipped: "bg-purple-900 text-purple-300",
      delivered: "bg-green-900 text-green-300",
      cancelled: "bg-red-900 text-red-300",
    };
    return colors[status] || "bg-gray-800 text-gray-200";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-300">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-300 mb-4">You have no orders yet</p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="block bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-300">Order ID</p>
                  <p className="font-semibold text-white">{order._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300">Order Date</p>
                  <p className="font-semibold text-white">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-300">Items</p>
                  <p className="font-semibold text-white">
                    {order.orderItems.length} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300">Total</p>
                  <p className="text-xl font-bold text-pink-400">
                    {formatINR(order.totalPrice)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                {order.isPaid ? (
                  <span className="text-green-300 text-sm font-semibold">
                    Paid
                  </span>
                ) : (
                  <span className="text-red-300 text-sm font-semibold">
                    Not Paid
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
