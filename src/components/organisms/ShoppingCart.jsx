import { useCartStore } from "../../store/cartStore.js";
import { Button } from "../atoms/Button.jsx";
import { Trash2, Plus, Minus } from "lucide-react";

export const ShoppingCart = () => {
  const { cart, addToCart, removeFromCart, clearCart, getTotal } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
        <p className="text-zinc-500 text-sm">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-700 font-medium">
          Clear all
        </button>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-3 border-b border-zinc-50 last:border-none">
            <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg bg-zinc-50" />
            <div className="flex-grow min-w-0">
              <h4 className="text-sm font-semibold text-zinc-900 truncate">{item.title}</h4>
              <p className="text-xs text-zinc-500">${item.price}</p>
            </div>
            
            <div className="flex items-center gap-2 bg-zinc-50 rounded-md p-1 border border-zinc-100">
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="p-0.5 hover:bg-white rounded transition-colors"
              >
                <Minus size={12} />
              </button>
              <span className="text-xs font-bold w-3 text-center">{item.quantity}</span>
              <button 
                onClick={() => addToCart(item)} 
                className="p-0.5 hover:bg-white rounded transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-zinc-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-zinc-500 text-sm">Total</span>
          <span className="text-xl font-bold text-black">${getTotal().toFixed(2)}</span>
        </div>
        <Button className="w-full py-3">
          Checkout
        </Button>
      </div>
    </div>
  );
};