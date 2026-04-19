import { useCartStore } from "../../store/cartStore";
import { ShoppingCart, Search, User } from "lucide-react"; // Usando lucide-react para ese look tech

export const Header = () => {
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tighter text-black">
          STORE<span className="text-zinc-400">.</span>
        </div>

        {/* Buscador (Simulado por ahora) */}
        <div className="hidden md:flex items-center bg-zinc-100 px-3 py-1.5 rounded-full w-96">
          <Search size={18} className="text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2"
          />
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-5">
          <button className="text-zinc-600 hover:text-black transition-colors">
            <User size={22} />
          </button>
          
          <button className="relative text-zinc-600 hover:text-black transition-colors">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};