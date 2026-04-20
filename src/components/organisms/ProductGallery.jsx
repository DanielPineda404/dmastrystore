import { ProductCard } from "../molecules/ProductCard.jsx";
import { useCartStore } from "../../store/cartStore.js";
import { useProductStore } from "../../store/productStore.js";
import { Pagination } from "../molecules/Pagination.jsx";
import { CategoryFilters } from "../molecules/CategoryFilters.jsx"; // <--- Importar
import { Loader2 } from "lucide-react";

export const ProductGallery = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { 
    getPaginatedProducts, 
    getTotalPages, 
    currentPage, 
    setCurrentPage,
    isLoading 
  } = useProductStore();

  const productsToShow = getPaginatedProducts();
  const totalPages = getTotalPages();

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-zinc-200" size={48} />
        <p className="text-zinc-400 font-medium animate-pulse">Fetching inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CategoryFilters /> {/* <--- Agregar aquí */}
      
      {productsToShow.length === 0 ? (
        <div className="py-20 text-center bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
          <p className="text-zinc-400 text-lg font-medium">No items match your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {productsToShow.map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                onAdd={addToCart} 
              />
            ))}
          </div>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </>
      )}
    </div>
  );
};