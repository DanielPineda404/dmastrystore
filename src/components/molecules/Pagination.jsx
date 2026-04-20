import { useProductStore } from "../../store/productStore.js";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = () => {
  const { currentPage, setCurrentPage, getTotalPages } = useProductStore();
  const totalPages = getTotalPages();

  // No renderizar si solo hay una página
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12 pb-10">
      {/* Botón Anterior con bloqueo */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full transition-all ${
          currentPage === 1 
            ? "text-zinc-200 cursor-not-allowed opacity-50" 
            : "text-zinc-900 hover:bg-zinc-100 active:scale-95"
        }`}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Números de página */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${
              currentPage === page
                ? "bg-black text-white shadow-lg shadow-black/20 scale-110"
                : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Botón Siguiente con bloqueo */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full transition-all ${
          currentPage === totalPages 
            ? "text-zinc-200 cursor-not-allowed opacity-50" 
            : "text-zinc-900 hover:bg-zinc-100 active:scale-95"
        }`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};