import { useCartStore } from "../../store/cartStore.js";
import { Button } from "../atoms/Button.jsx";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export const ShoppingCart = ({ onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm text-center">
        <div className="bg-zinc-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="text-zinc-300" size={24} />
        </div>
        <h3 className="font-bold text-zinc-900">Your cart is empty</h3>
        <p className="text-zinc-400 text-xs mt-1">Add some products to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-black text-xl tracking-tighter">Your Cart</h3>
        <button
          onClick={clearCart}
          className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
        {cart.map(item => (
          <div key={item.id} className="flex gap-4 group">
            <div className="w-16 h-16 bg-zinc-50 rounded-xl p-2 flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="text-xs font-bold text-zinc-900 truncate uppercase tracking-tight">
                {item.title}
              </h4>
              <p className="text-sm font-black text-zinc-400 mt-0.5">${item.price}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center border border-zinc-100 rounded-lg overflow-hidden bg-zinc-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-zinc-200 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-2 text-[10px] font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-zinc-200 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-zinc-100">
        <div className="flex justify-between items-end mb-6">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Total</span>
          <span className="text-3xl font-black text-zinc-900 tracking-tighter">
            ${getTotal().toFixed(2)}
          </span>
        </div>
        <Button onClick={onCheckout} className="w-full py-4 text-xs font-bold uppercase tracking-[0.15em] shadow-lg shadow-black/5">
          Checkout Now
        </Button>
      </div>
    </div>
  );
};