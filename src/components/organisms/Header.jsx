import { useCartStore } from "../../store/cartStore.js";
import { useProductStore } from "../../store/productStore.js";
import { useUserStore } from "../../store/userStore.js";
import { ShoppingCart, Search, UserCheck, User as UserIcon, Home } from "lucide-react";

export const Header = ({ onNavigate }) => {
  const cart = useCartStore((state) => state.cart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const { searchTerm, setSearchTerm } = useProductStore();
  const { user, isLoggedIn } = useUserStore();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo / Botón Home */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate("shop")}
        >
          <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-zinc-700 transition-colors md:hidden">
            <Home size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-black group-hover:opacity-70 transition-opacity">
            STORE<span className="text-zinc-400">.</span>
          </h1>
        </div>

        {/* Buscador (Desktop) */}
        <div className="hidden md:flex items-center bg-zinc-100 px-3 py-1.5 rounded-full w-80">
          <Search size={16} className="text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="bg-transparent border-none focus:ring-0 text-xs w-full ml-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Acciones del Usuario */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Botón Home explícito para Desktop (Opcional) */}
          <button 
            onClick={() => onNavigate("shop")}
            className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-zinc-50 rounded-lg transition-colors text-zinc-500 hover:text-black"
          >
            <Home size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Shop</span>
          </button>

          {/* Perfil de Usuario */}
          <button 
            className="flex items-center gap-2 hover:bg-zinc-50 p-2 rounded-lg transition-colors"
            onClick={() => onNavigate("login")}
          >
            {isLoggedIn ? (
              <>
                <span className="text-xs font-medium text-zinc-600 hidden lg:block">
                  Hi, {user.name}
                </span>
                <UserCheck size={20} className="text-green-500" />
              </>
            ) : (
              <UserIcon size={20} className="text-zinc-400" />
            )}
          </button>
          
          {/* Carrito */}
          <button 
            className="relative p-2 hover:bg-zinc-50 rounded-lg transition-colors" 
            onClick={toggleCart}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};