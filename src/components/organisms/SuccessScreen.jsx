import { Button } from "../atoms/Button.jsx";
import { CheckCircle2, PartyPopper, ShoppingBag } from "lucide-react";

export const SuccessScreen = ({ onReturn }) => (
  <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
    <div className="relative mb-8">
      <div className="bg-green-100 p-6 rounded-full">
        <CheckCircle2 size={64} className="text-green-600 animate-bounce" />
      </div>
      <div className="absolute -top-2 -right-2">
        <PartyPopper size={32} className="text-yellow-500 animate-pulse" />
      </div>
    </div>

    <div className="text-center space-y-4 max-w-sm">
      <h2 className="text-3xl font-black text-zinc-900 tracking-tight">¡Pedido Confirmado!</h2>
      <p className="text-zinc-500 leading-relaxed">
        Tu pago fue procesado exitosamente. Hemos enviado un correo de confirmación a tu bandeja de entrada.
      </p>
    </div>

    <div className="mt-12 w-full max-w-xs space-y-3">
      <Button
        onClick={onReturn}
        className="w-full py-4 flex items-center justify-center gap-2"
      >
        <ShoppingBag size={18} />
        Seguir Comprando
      </Button>
      <p className="text-center text-xs text-zinc-400">Order ID: #{Math.floor(Math.random() * 1000000)}</p>
    </div>
  </div>
);