import { create } from 'zustand';
import { fetchAllProducts } from '../services/productService';

const ITEMS_PER_PAGE = 6;

const filterProducts = (allProducts, selectedCategory, searchTerm) => {
  let filtered = allProducts;

  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(term));
  }

  return filtered;
};

const getUniqueCategories = (products) => ['all', ...new Set(products.map(p => p.category))];

const findProductIndex = (products, product) => {
  if (!product) return -1;
  return products.findIndex(p => p.id === product.id);
};

const getNavigationIndex = (currentIndex, direction, length) => {
  if (length === 0) return -1;
  return direction === 'next' ? (currentIndex + 1) % length : (currentIndex - 1 + length) % length;
};

export const useProductStore = create((set, get) => ({
  allProducts: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: 'all',
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: ITEMS_PER_PAGE,
  isLoading: false,
  selectedProduct: null,

  fetchProducts: async () => {
    set({ isLoading: true });
    const data = await fetchAllProducts();
    set({
      allProducts: data,
      filteredProducts: data,
      categories: getUniqueCategories(data),
      isLoading: false,
      currentPage: 1,
    });
  },

  applyFilters: () => {
    const { allProducts, selectedCategory, searchTerm } = get();
    const filtered = filterProducts(allProducts, selectedCategory, searchTerm);
    set({ filteredProducts: filtered, currentPage: 1 });
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().applyFilters();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().applyFilters();
  },

  setCurrentPage: (page) => {
    const total = get().getTotalPages();
    const validPage = Math.max(1, Math.min(page, total));
    set({ currentPage: validPage });
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),

  showNextProduct: () => {
    const { filteredProducts, selectedProduct } = get();
    const idx = findProductIndex(filteredProducts, selectedProduct);
    if (idx === -1) return;
    const nextIdx = getNavigationIndex(idx, 'next', filteredProducts.length);
    set({ selectedProduct: filteredProducts[nextIdx] });
  },

  showPrevProduct: () => {
    const { filteredProducts, selectedProduct } = get();
    const idx = findProductIndex(filteredProducts, selectedProduct);
    if (idx === -1) return;
    const prevIdx = getNavigationIndex(idx, 'prev', filteredProducts.length);
    set({ selectedProduct: filteredProducts[prevIdx] });
  },

  getPaginatedProducts: () => {
    const { filteredProducts, currentPage, itemsPerPage } = get();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  },

  getTotalPages: () => {
    const { filteredProducts, itemsPerPage } = get();
    return Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  },
}));