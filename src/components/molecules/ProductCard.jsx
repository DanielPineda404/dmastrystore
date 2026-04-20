import { Button } from "../atoms/Button.jsx";
import { toast } from "sonner";
import { useProductStore } from "../../store/productStore.js";

export const ProductCard = ({ product, onAdd }) => {
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);

  return (
    <div className="group bg-white p-4 rounded-2xl border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 flex flex-col h-full">
      {/* Imagen Clickeable */}
      <div 
        onClick={() => setSelectedProduct(product)}
        className="aspect-square overflow-hidden rounded-xl bg-zinc-50 mb-4 flex items-center justify-center p-6 cursor-pointer"
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
          {product.category}
        </span>
        <h3 
          onClick={() => setSelectedProduct(product)}
          className="font-bold text-zinc-900 truncate text-sm cursor-pointer hover:underline"
        >
          {product.title}
        </h3>
        <p className="text-xs text-zinc-500 mb-4 line-clamp-2 h-8 mt-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-lg font-black text-zinc-900">${product.price}</span>
          <Button 
            variant="primary" 
            className="text-[10px] py-2 px-3 h-8 uppercase font-bold tracking-wider"
            onClick={() => {
              onAdd(product);
              toast.success(`${product.title.substring(0, 15)}... added to cart`);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};