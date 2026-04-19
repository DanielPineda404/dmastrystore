import { useCartStore } from "../../store/cartStore";
import { Button } from "../atoms/Button";
import { Trash2, Plus, Minus } from "lucide-react";

export const ShoppingCart = () => {
  const { cart, addToCart, removeFromCart, clearCart, getTotal } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
        <p className="text-zinc-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={clearCart} className="text-xs text-red-500 hover:underline">
          Clear all
        </button>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b border-zinc-50 last:border-none">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg bg-zinc-50" />
            <div className="flex-grow">
              <h4 className="text-sm font-semibold text-zinc-900 line-clamp-1">{item.title}</h4>
              <p className="text-sm text-zinc-500">${item.price}</p>
            </div>
            
            {/* Controles de cantidad */}
            <div className="flex items-center gap-2 bg-zinc-100 rounded-lg p-1">
              <button 
                onClick={() => removeFromCart(item.id)} // Aquí podrías ajustar para que reste 1 en vez de eliminar
                className="p-1 hover:bg-white rounded-md transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
              <button 
                onClick={() => addToCart(item)} 
                className="p-1 hover:bg-white rounded-md transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <button 
              onClick={() => removeFromCart(item.id)} 
              className="text-zinc-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-zinc-500">Total amount</span>
          <span className="text-2xl font-bold">${getTotal().toFixed(2)}</span>
        </div>
        <Button className="w-full py-4 text-lg">
          Continue to Checkout
        </Button>
      </div>
    </div>
  );
};