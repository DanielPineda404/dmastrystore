import { ProductCard } from "../molecules/ProductCard";
import { useCartStore } from "../../store/cartStore";
import { useProductStore } from "../../store/productStore";
import { Pagination } from "../molecules/Pagination";

export const ProductGallery = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { getPaginatedProducts, getTotalPages, currentPage, setCurrentPage } = useProductStore();

  const productsToShow = getPaginatedProducts();
  const totalPages = getTotalPages();

  if (productsToShow.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-zinc-400 text-lg">No products found matching your search.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productsToShow.map((product) => (
          <ProductCard 
            key={product.id}
            product={product} 
            onAdd={addToCart} 
          />
        ))}
      </div>
      
      {/* Paginación integrada aquí abajo */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};