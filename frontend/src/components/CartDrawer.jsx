import { X } from "lucide-react";
import { useApp } from "../context/AppContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, getTotalPrice } = useApp();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
     <div
  className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 flex flex-col"
  onClick={(e) => e.stopPropagation()}
>
  {/* Header (fixed) */}
  <div className="flex justify-between mb-6">
    <h2 className="text-2xl font-bold">Shopping Cart</h2>
    <X onClick={onClose} className="cursor-pointer" />
  </div>

  {cartItems.length === 0 ? (
    <p className="text-center text-gray-500">Cart is empty</p>
  ) : (
    <>
      {/* ✅ SCROLLABLE CART ITEMS */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {cartItems
          .filter(item => item.product)
          .map(item => (
            <div
              key={item._id}
              className="flex items-center space-x-4 border-b pb-4"
            >
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.product.title}</h3>
                <p className="text-blue-600 font-bold">
                  ₹{item.product.price} × {item.quantity}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
      </div>

      {/* Footer (fixed) */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between text-xl font-bold mb-4">
          <span>Total:</span>
          <span>₹{getTotalPrice()}</span>
        </div>

        <button className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold">
          Checkout
        </button>
      </div>
    </>
  )}
</div>
    </div>
  );
};

export default CartDrawer;
