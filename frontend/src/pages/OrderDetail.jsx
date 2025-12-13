import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { formatINR } from "../utils/currency";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order:", error);
      navigate("/orders");
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
        <div className="text-lg text-gray-300">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/orders")}
        className="mb-4 text-pink-300 hover:text-pink-200"
      >
        ← Back to Orders
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Order Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div
                  key={item._id || item.product?._id}
                  className="flex items-center space-x-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-300">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">
                    {formatINR(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Shipping Address
            </h2>
            <div className="text-gray-300">
              <p className="font-semibold">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Items</span>
                <span className="font-semibold text-white">
                  {formatINR(order.itemsPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Shipping</span>
                <span className="font-semibold text-white">
                  {formatINR(order.shippingPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Tax</span>
                <span className="font-semibold text-white">
                  {formatINR(order.taxPrice)}
                </span>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-lg font-bold text-white">
                    {formatINR(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div>
                <p className="text-sm text-gray-300 mb-1">Payment Method</p>
                <p className="font-semibold capitalize text-white">
                  {order.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-300 mb-1">Payment Status</p>
                {order.paymentMethod === "cash" && !order.isPaid ? (
                  <>
                    <p className="font-semibold text-orange-400">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Payment will be collected on delivery
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className={`font-semibold ${
                        order.isPaid ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </p>
                    {order.isPaid && order.paidAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        Paid on {new Date(order.paidAt).toLocaleDateString()}
                      </p>
                    )}
                  </>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-300 mb-1">Order Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              {order.isDelivered && order.deliveredAt && (
                <div>
                  <p className="text-sm text-gray-300 mb-1">Delivered On</p>
                  <p className="font-semibold text-white">
                    {new Date(order.deliveredAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
