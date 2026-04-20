import { Button } from "../atoms/Button.jsx";
import { toast } from "sonner"; // <--- Importar toast

export const ProductCard = ({ product, onAdd }) => {
  const handleAdd = () => {
    onAdd(product);
    // Lanzamos la notificación
    toast.success(`${product.title.substring(0, 20)}... added to cart`, {
      description: "You can view it in your shopping cart summary.",
      duration: 2000,
    });
  };

  return (
    <div className="group bg-white p-4 rounded-2xl border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 flex flex-col h-full">
      <div className="aspect-square overflow-hidden rounded-xl bg-zinc-50 mb-4 flex items-center justify-center p-6">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
          {product.category}
        </span>
        <h3 className="font-bold text-zinc-900 truncate text-sm">{product.title}</h3>
        <p className="text-xs text-zinc-500 mb-4 line-clamp-2 h-8 mt-1">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-lg font-black text-zinc-900">${product.price}</span>
          <Button 
            variant="primary" 
            className="text-[10px] py-2 px-3 h-8 uppercase font-bold tracking-wider"
            onClick={handleAdd} // <--- Usamos nuestra nueva función
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};