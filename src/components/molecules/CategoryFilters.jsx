import { useProductStore } from "../../store/productStore.js";

const CATEGORY_BUTTON_STYLES = (isSelected) => `px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
  isSelected
    ? "bg-black text-white border-black shadow-md"
    : "bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300"
}`;

export const CategoryFilters = () => {
  const { categories, selectedCategory, setCategory } = useProductStore();

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setCategory(category)}
          className={CATEGORY_BUTTON_STYLES(selectedCategory === category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};