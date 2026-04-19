import { useCartStore } from "../../store/cartStore.js";
import { useProductStore } from "../../store/productStore.js";
import { useUserStore } from "../../store/userStore.js";
import { ShoppingCart, Search, UserCheck, User as UserIcon } from "lucide-react";

export const Header = () => {
  const cart = useCartStore((state) => state.cart);
  const { searchTerm, setSearchTerm } = useProductStore();
  const { user, isLoggedIn } = useUserStore();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tighter text-black">
          STORE<span className="text-zinc-400">.</span>
        </div>

        <div className="hidden md:flex items-center bg-zinc-100 px-3 py-1.5 rounded-full w-80">
          <Search size={16} className="text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-xs w-full ml-2"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <span className="text-xs font-medium text-zinc-600 hidden sm:block">Hi, {user.name}</span>
                <UserCheck size={20} className="text-green-500" />
              </>
            ) : (
              <UserIcon size={20} className="text-zinc-400" />
            )}
          </div>
          
          <button className="relative p-2">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};