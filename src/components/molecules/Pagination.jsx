import { useProductStore } from "../../store/productStore.js";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_BUTTON_STYLES = (isActive) => `w-10 h-10 rounded-full text-xs font-bold transition-all ${
  isActive
    ? "bg-black text-white shadow-lg shadow-black/20 scale-110"
    : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
}`;

const NAV_BUTTON_STYLES = (isDisabled) => `p-2 rounded-full transition-all ${
  isDisabled
    ? "text-zinc-200 cursor-not-allowed opacity-50"
    : "text-zinc-900 hover:bg-zinc-100 active:scale-95"
}`;

export const Pagination = () => {
  const { currentPage, setCurrentPage, getTotalPages } = useProductStore();
  const totalPages = getTotalPages();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12 pb-10">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={NAV_BUTTON_STYLES(currentPage === 1)}
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={PAGE_BUTTON_STYLES(currentPage === page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={NAV_BUTTON_STYLES(currentPage === totalPages)}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};