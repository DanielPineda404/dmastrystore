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

  // Soporte para navegación por teclado (Flechas y Escape)
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

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    toast.success("Product added to your bag");
  };

  // Cierra el modal si se hace clic en el fondo negro
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      clearSelectedProduct();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      {/* Botones de Navegación Flotantes (Solo Desktop) */}
      <button 
        onClick={showPrevProduct}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all shadow-2xl hidden md:block"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={showNextProduct}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all shadow-2xl hidden md:block"
      >
        <ChevronRight size={32} />
      </button>

      {/* Contenedor del Modal */}
      <div className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300 relative">
        
        {/* Lado Izquierdo: Imagen */}
        {/* Usamos key={selectedProduct.id} para forzar la animación al cambiar */}
        <div key={`img-${selectedProduct.id}`} className="md:w-1/2 bg-zinc-50 p-12 flex items-center justify-center relative animate-in fade-in duration-500">
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.title} 
            className="max-h-[450px] object-contain drop-shadow-2xl"
          />
          {/* Botón Cerrar (Mobile) */}
          <button 
            onClick={clearSelectedProduct}
            className="absolute top-6 left-6 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform md:hidden"
          >
            <X size={20} />
          </button>
          
          {/* Navegación (Mobile) */}
          <div className="absolute bottom-6 inset-x-6 flex justify-between md:hidden">
            <button onClick={showPrevProduct} className="p-3 bg-white rounded-full shadow-lg">
              <ChevronLeft size={20} />
            </button>
            <button onClick={showNextProduct} className="p-3 bg-white rounded-full shadow-lg">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Lado Derecho: Contenido */}
        {/* Usamos key={selectedProduct.id} aquí también para animar el texto */}
        <div key={`txt-${selectedProduct.id}`} className="md:w-1/2 p-12 flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="hidden md:flex justify-end relative z-10">
            <button 
              onClick={clearSelectedProduct} 
              className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-4">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">
              {selectedProduct.category}
            </span>
            <h2 className="text-4xl font-black text-zinc-900 mt-2 leading-tight tracking-tighter">
              {selectedProduct.title}
            </h2>
            
            <div className="flex items-center gap-4 mt-5">
              <div className="flex items-center bg-yellow-400/10 px-2.5 py-1 rounded-md">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold ml-1.5 text-yellow-700">
                  {selectedProduct.rating?.rate || "4.5"}
                </span>
              </div>
              <span className="text-sm text-zinc-400 font-medium tracking-tight">
                Based on {selectedProduct.rating?.count || "120"} verified reviews
              </span>
            </div>
          </div>

          <p className="text-zinc-500 text-sm mt-8 leading-relaxed flex-grow font-medium">
            {selectedProduct.description}
          </p>

          <div className="mt-10 space-y-6 pt-8 border-t border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-zinc-900 tracking-tighter">
                ${selectedProduct.price}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-green-700 bg-green-50 px-4 py-1.5 rounded-full uppercase tracking-wider">
                <ShieldCheck size={14} /> Factory Sealed • In Stock
              </div>
            </div>

            <Button 
              onClick={handleAddToCart} 
              className="w-full py-5 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest shadow-xl shadow-black/10 active:scale-[0.98] transition-all"
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