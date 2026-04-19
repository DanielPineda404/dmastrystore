import { mockProducts } from "../../mockdata/products";
import { ProductCard } from "../molecules/ProductCard";
import { useCartStore } from "../../store/cartStore";

export const ProductGallery = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <div key={product.id} className="flex flex-col">
          {/* Sobreescribimos el ProductCard para pasarle la acción de agregar */}
          <ProductCard 
            product={product} 
            onAdd={() => addToCart(product)} 
          />
        </div>
      ))}
    </div>
  );
};