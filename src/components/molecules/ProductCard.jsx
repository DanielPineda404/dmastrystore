import { Button } from "../atoms/Button";

export const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white p-4 rounded-2xl border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300">
      <div className="aspect-square overflow-hidden rounded-xl bg-zinc-50 mb-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="font-semibold text-zinc-900 truncate">{product.title}</h3>
      <p className="text-sm text-zinc-500 mb-4 line-clamp-1">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">${product.price}</span>
        <Button variant="primary" className="text-sm py-1.5 px-3">
          Add
        </Button>
      </div>
    </div>
  );
};