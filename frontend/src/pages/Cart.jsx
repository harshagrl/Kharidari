import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { formatINR } from "../utils/currency";

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart, fetchCart } =
    useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cart");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items)
      return { itemsPrice: 0, shippingPrice: 0, taxPrice: 0, totalPrice: 0 };
    const itemsPrice = cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = itemsPrice * 0.1;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-purple-600"></div>
          <p className="mt-4 text-gray-300 text-lg">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-purple-800 to-pink-800 rounded-full mb-6">
            <svg
              className="w-16 h-16 text-pink-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-300 mb-8">
            Start adding some amazing products!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-300 mb-8">
          {cart.items.length} {cart.items.length === 1 ? "item" : "items"} in
          your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item, index) => (
              <div
                key={item._id}
                className="bg-gray-800 rounded-2xl shadow-md p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0">
                    <img
                      src={
                        item.product?.image || "https://via.placeholder.com/200"
                      }
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.product?.name}
                    </h3>
                    <p className="text-lg font-semibold text-pink-400 mb-4">
                      {formatINR(item.product?.price)} each
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-gray-700 rounded-xl p-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-gray-600 font-bold text-lg transition-colors shadow-sm text-white"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-gray-600 font-bold text-lg transition-colors shadow-sm text-white"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {formatINR(
                            (item.product?.price || 0) * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="p-3 text-red-400 hover:bg-red-900/40 rounded-xl transition-colors"
                    title="Remove item"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">
                    {formatINR(totals.itemsPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="font-semibold text-white">
                    {totals.shippingPrice === 0 ? (
                      <span className="text-green-300">Free</span>
                    ) : (
                      formatINR(totals.shippingPrice)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span className="font-semibold text-white">
                    {formatINR(totals.taxPrice)}
                  </span>
                </div>
                <div className="border-t-2 border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-white">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {formatINR(totals.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
