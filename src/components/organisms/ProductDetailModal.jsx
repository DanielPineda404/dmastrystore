import { useEffect } from "react";
import { useProductStore } from "../../store/productStore.js";
import { useCartStore } from "../../store/cartStore.js";
import { Button } from "../atoms/Button.jsx";
import { X, ShoppingCart, Star, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export const ProductDetailModal = () => {
  const { 
    selectedProduct, 
    clearSelectedProduct, 
    showNextProduct, 
    showPrevProduct 
  } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  // Soporte para navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProduct) return;
      if (e.key === "ArrowRight") showNextProduct();
      if (e.key === "ArrowLeft") showPrevProduct();
      if (e.key === "Escape") clearSelectedProduct();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProduct, showNextProduct, showPrevProduct, clearSelectedProduct]);

  // Bloquear el scroll del body
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    toast.success("Product added to your bag");
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      clearSelectedProduct();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      {/* Botones de Navegación Flotantes (Desktop) */}
      <button 
        onClick={showPrevProduct}
        className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 md:p-4 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all shadow-2xl hidden md:block"
      >
        <ChevronLeft size={24} className="md:w-8 md:h-8" />
      </button>
      <button 
        onClick={showNextProduct}
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 md:p-4 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all shadow-2xl hidden md:block"
      >
        <ChevronRight size={24} className="md:w-8 md:h-8" />
      </button>

      {/* Contenedor Principal del Modal */}
      <div className="bg-white w-full max-w-6xl h-auto max-h-[90vh] md:h-[80vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300 relative">
        
        {/* Botón Cerrar Global */}
        <button 
          onClick={clearSelectedProduct} 
          className="absolute top-5 right-5 z-50 p-2.5 bg-white/80 backdrop-blur-sm text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-all shadow-sm"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        {/* Lado Izquierdo: Imagen */}
        <div key={`img-${selectedProduct.id}`} className="w-full md:w-1/2 bg-zinc-50 p-8 md:p-12 flex items-center justify-center relative animate-in fade-in duration-500 min-h-[250px] md:h-full">
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.title} 
            className="max-h-full max-w-full object-contain drop-shadow-2xl"
          />
          
          <div className="absolute bottom-4 inset-x-4 flex justify-between md:hidden z-10">
            <button onClick={showPrevProduct} className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-zinc-800">
              <ChevronLeft size={20} />
            </button>
            <button onClick={showNextProduct} className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-zinc-800">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Lado Derecho: Contenido */}
        <div key={`txt-${selectedProduct.id}`} className="w-full md:w-1/2 flex flex-col animate-in fade-in slide-in-from-right-4 duration-500 overflow-hidden">
          
          {/* 1. Cabecera (Fija) */}
          <div className="p-8 md:p-12 pb-4 border-b border-zinc-100/50">
            <span className="text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-[0.25em]">
              {selectedProduct.category}
            </span>
            <h2 className="text-xl md:text-3xl font-black text-zinc-900 mt-2 leading-tight tracking-tighter line-clamp-2">
              {selectedProduct.title}
            </h2>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center bg-yellow-400/10 px-2.5 py-1 rounded-md">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold ml-1.5 text-yellow-700">
                  {selectedProduct.rating?.rate || "4.5"}
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium truncate">
                {selectedProduct.rating?.count || "120"} reviews
              </span>
            </div>
          </div>

          {/* 2. Cuerpo (Scrollable) */}
          <div className="flex-grow overflow-y-auto p-8 md:p-12 py-4 md:py-6 custom-scrollbar bg-white">
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium">
              {selectedProduct.description}
            </p>
          </div>

          {/* 3. Pie (Fijo en la base) */}
          <div className="p-8 md:px-12 md:py-8 border-t border-zinc-100 bg-zinc-50/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <span className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tighter">
                ${selectedProduct.price}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-700 bg-green-100/60 px-3 py-1 rounded-full uppercase tracking-wider">
                <ShieldCheck size={14} /> In Stock
              </div>
            </div>

            <Button 
              onClick={handleAddToCart} 
              className="w-full py-4 md:py-5 flex items-center justify-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest shadow-xl shadow-black/10 active:scale-[0.98] transition-all"
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