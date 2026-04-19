import { Button } from "../atoms/Button";

export const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="group bg-white p-4 rounded-2xl border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 flex flex-col h-full">
      {/* Contenedor de Imagen */}
      <div className="aspect-square overflow-hidden rounded-xl bg-zinc-50 mb-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Información */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-zinc-900 truncate">{product.title}</h3>
        <p className="text-sm text-zinc-500 mb-4 line-clamp-2 h-10">{product.description}</p>
        
        {/* Footer de la Card */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-zinc-900">${product.price}</span>
          <Button 
            variant="primary" 
            className="text-xs py-2 px-4"
            onClick={() => onAdd(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};