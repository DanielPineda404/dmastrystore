import { Button } from "../atoms/Button.jsx";
import { toast } from "sonner";
import { useProductStore } from "../../store/productStore.js";
import { ImageOff } from "lucide-react";

const FALLBACK_IMAGE = "https://placehold.co/400x400/f4f4f5/a1a1aa?text=No+Image";

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
};

export const ProductCard = ({ product, onAdd }) => {
  const setSelectedProduct = useProductStore(state => state.setSelectedProduct);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAdd(product);
    toast.success("Added to cart");
  };

  return (
    <div className="group bg-white p-4 rounded-2xl border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 flex flex-col h-full">
      <div
        onClick={() => setSelectedProduct(product)}
        className="aspect-square overflow-hidden rounded-xl bg-zinc-50 mb-4 flex items-center justify-center p-6 cursor-pointer"
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            onError={handleImageError}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-zinc-300">
            <ImageOff size={32} />
            <span className="text-[10px] font-bold uppercase">No Preview</span>
          </div>
        )}
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

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-50">
          <span className="text-lg font-black text-zinc-900">${product.price}</span>
          <Button
            variant="primary"
            className="text-[10px] py-2 px-3 h-8 uppercase font-bold tracking-wider"
            onClick={handleAddToCart}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};