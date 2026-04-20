import { useCartStore } from "../../store/cartStore.js";
import { useUserStore } from "../../store/userStore.js"; // Importamos para la validación
import { Button } from "../atoms/Button.jsx";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export const ShoppingCart = ({ onCheckout }) => {
  const { cart, addToCart, removeFromCart, clearCart, getTotal } = useCartStore();
  const { isLoggedIn } = useUserStore();

  const handleCheckoutClick = () => {
    if (!isLoggedIn) {
      toast.error("Authentication required", {
        description: "Please login or register to complete your purchase."
      });
      return;
    }
    onCheckout();
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
        <p className="text-zinc-500 text-sm font-medium">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-zinc-900">Your Cart</h2>
        <button 
          onClick={clearCart} 
          className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-3 border-b border-zinc-50 last:border-none">
            <div className="w-12 h-12 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-grow min-w-0">
              <h4 className="text-sm font-bold text-zinc-900 truncate">{item.title}</h4>
              <p className="text-xs text-zinc-500 font-medium">${item.price}</p>
            </div>
            
            <div className="flex items-center gap-2 bg-zinc-50 rounded-lg p-1 border border-zinc-100">
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="p-1 hover:bg-white rounded transition-all"
              >
                <Minus size={12} />
              </button>
              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
              <button 
                onClick={() => addToCart(item)} 
                className="p-1 hover:bg-white rounded transition-all"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-zinc-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-zinc-500 text-sm font-medium">Total</span>
          <span className="text-2xl font-black text-black">
            ${getTotal().toFixed(2)}
          </span>
        </div>
        
        <Button 
          className="w-full py-4 text-sm font-bold uppercase tracking-widest shadow-lg shadow-black/5" 
          onClick={handleCheckoutClick}
          disabled={cart.length === 0}
        >
          Go to Checkout
        </Button>
      </div>
    </div>
  );
};