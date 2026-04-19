import { useCartStore } from "../../store/cartStore.js";
import { useUserStore } from "../../store/userStore.js";
import { Button } from "../atoms/Button.jsx";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";

export const CheckoutPreview = ({ onBack }) => {
  const { cart, getTotal, clearCart } = useCartStore();
  const { user } = useUserStore();

  const handleConfirmPurchase = () => {
    alert(`¡Gracias por tu compra, ${user?.name || 'Cliente'}! Tu pedido ha sido procesado.`);
    clearCart();
    onBack(); // Regresar a la tienda
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to shopping
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Resumen de Productos */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Review Order</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-zinc-50 pb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold truncate w-40">{item.title}</p>
                    <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detalles de Envío y Pago */}
        <div className="bg-zinc-50 p-8 rounded-3xl space-y-6 border border-zinc-100">
          <div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Shipping to</h3>
            <p className="font-medium">{user?.name || "Guest User"}</p>
            <p className="text-sm text-zinc-500">{user?.email || "No email provided"}</p>
          </div>

          <div className="pt-6 border-t border-zinc-200">
            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <span>Total due</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            
            <div className="space-y-3">
              <Button onClick={handleConfirmPurchase} className="w-full py-4 flex items-center justify-center gap-2">
                <CreditCard size={18} />
                Confirm and Pay
              </Button>
              <p className="text-[10px] text-zinc-400 flex items-center justify-center gap-1">
                <ShieldCheck size={12} />
                Secure encrypted checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};