import { useProductStore } from "../../store/productStore.js";

export const CategoryFilters = () => {
  const { categories, selectedCategory, setCategory } = useProductStore();

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border uppercase tracking-wider ${
            selectedCategory === cat
              ? "bg-black text-white border-black shadow-md"
              : "bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};