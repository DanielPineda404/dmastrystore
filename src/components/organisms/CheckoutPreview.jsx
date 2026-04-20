import { useCartStore } from "../../store/cartStore.js";
import { useUserStore } from "../../store/userStore.js";
import { Button } from "../atoms/Button.jsx";
import { ArrowLeft, CreditCard, ShieldCheck, Loader2 } from "lucide-react";
import { useState } from "react";

const PROCESSING_DELAY = 2000;

export const CheckoutPreview = ({ onBack, onSuccess }) => {
  const { cart, getTotal, clearCart } = useCartStore();
  const { user } = useUserStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPurchase = () => {
    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      onSuccess();
    }, PROCESSING_DELAY);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        disabled={isProcessing}
        className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors text-sm font-medium disabled:opacity-30"
      >
        <ArrowLeft size={16} />
        Back to shopping
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Review Order</h2>
          <div className="space-y-4">
            {cart.map(item => (
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

        <div className="bg-zinc-50 p-8 rounded-3xl space-y-6 border border-zinc-100 relative overflow-hidden">
          {isProcessing && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-10 animate-in fade-in">
              <Loader2 className="animate-spin text-black mb-2" size={32} />
              <p className="text-sm font-bold tracking-widest uppercase text-black">Processing...</p>
            </div>
          )}

          <div>
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Shipping Information</h3>
            <p className="font-bold text-zinc-900">{user?.name || "Guest Account"}</p>
            <p className="text-sm text-zinc-500">{user?.email || "standard-shipping@example.com"}</p>
          </div>

          <div className="pt-6 border-t border-zinc-200">
            <div className="flex justify-between items-center text-xl font-black mb-6">
              <span>Total</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
                className="w-full py-4 flex items-center justify-center gap-2 shadow-xl shadow-black/10"
              >
                {!isProcessing && <CreditCard size={18} />}
                {isProcessing ? "Confirming..." : "Pay Now"}
              </Button>
              <p className="text-[10px] text-zinc-400 flex items-center justify-center gap-1">
                <ShieldCheck size={12} className="text-green-500" />
                Verified & Secure Transaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};