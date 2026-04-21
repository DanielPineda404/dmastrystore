import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore.js";
import { Button } from "../atoms/Button.jsx";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const CartDrawer = () => {
  const navigate = useNavigate();
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart, getTotal } = useCartStore();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }
    setCartOpen(false);
    navigate("/checkout");
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">

        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 p-2 rounded-xl">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-black text-zinc-900 tracking-tighter">Tu Carrito</h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-black transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-zinc-50 p-6 rounded-full">
                <ShoppingBag size={48} className="text-zinc-200" />
              </div>
              <p className="text-zinc-500 font-medium">Tu carrito está vacío.<br />¡Empieza a añadir algunos productos!</p>
              <Button variant="outline" onClick={() => setCartOpen(false)}>Seguir Comprando</Button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="w-20 h-20 bg-zinc-50 rounded-2xl p-2 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-zinc-900 line-clamp-1">{item.title}</h4>
                  <p className="text-sm font-black text-zinc-500 mt-1">${item.price}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-zinc-100 rounded-lg overflow-hidden bg-zinc-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-zinc-200 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-xs font-bold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-zinc-200 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 border-t border-zinc-100 bg-zinc-50/50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Monto Total</span>
              <span className="text-3xl font-black text-zinc-900 tracking-tighter">${getTotal().toFixed(2)}</span>
            </div>
            <Button
              className="w-full py-5 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest shadow-xl shadow-black/10"
              onClick={handleCheckout}
            >
              Pago Seguro
              <ArrowRight size={18} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};