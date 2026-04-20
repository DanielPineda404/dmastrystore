import { useProductStore } from "../../store/productStore.js";
import { useCartStore } from "../../store/cartStore.js";
import { Button } from "../atoms/Button.jsx";
import { X, ShoppingCart, Star, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const ProductDetailModal = () => {
  const { selectedProduct, clearSelectedProduct } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    toast.success("Product added to your bag");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        
        {/* Lado Izquierdo: Imagen */}
        <div className="md:w-1/2 bg-zinc-50 p-12 flex items-center justify-center relative">
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.title} 
            className="max-h-[400px] object-contain drop-shadow-2xl"
          />
          <button 
            onClick={clearSelectedProduct}
            className="absolute top-6 left-6 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lado Derecho: Contenido */}
        <div className="md:w-1/2 p-10 flex flex-col">
          <div className="hidden md:flex justify-end">
            <button 
              onClick={clearSelectedProduct} 
              className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-4">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
              {selectedProduct.category}
            </span>
            <h2 className="text-3xl font-black text-zinc-900 mt-2 leading-tight tracking-tighter">
              {selectedProduct.title}
            </h2>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center bg-yellow-400/10 px-2 py-1 rounded-md">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold ml-1 text-yellow-700">
                  {selectedProduct.rating?.rate || "4.5"}
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                {selectedProduct.rating?.count || "120"} reviews
              </span>
            </div>
          </div>

          <p className="text-zinc-500 text-sm mt-6 leading-relaxed flex-grow">
            {selectedProduct.description}
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-zinc-900 tracking-tighter">
                ${selectedProduct.price}
              </span>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
                <ShieldCheck size={12} /> In Stock
              </div>
            </div>

            <Button 
              onClick={handleAddToCart} 
              className="w-full py-5 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest shadow-xl shadow-black/10"
            >
              <ShoppingCart size={18} />
              Add to Shopping Bag
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};