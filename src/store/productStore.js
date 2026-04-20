import { create } from 'zustand';
import { fetchAllSources } from '../services/productService';

export const useProductStore = create((set, get) => ({
  allProducts: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: 'all',
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 6,
  isLoading: false,
  selectedProduct: null,

  fetchProducts: async () => {
    set({ isLoading: true });
    const data = await fetchAllSources();
    
    const uniqueCategories = ['all', ...new Set(data.map(p => p.category))];
    
    set({ 
      allProducts: data, 
      filteredProducts: data, 
      categories: uniqueCategories, 
      isLoading: false,
      currentPage: 1 
    });
  },

  // Centraliza el filtrado para que siempre resetee la página a 1
  applyFilters: () => {
    const { allProducts, selectedCategory, searchTerm } = get();
    let filtered = [...allProducts];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
    const { getTotalPages } = get();
    const total = getTotalPages();
    
    // Candado de seguridad: No bajar de 1 ni superar el total
    if (page < 1) return set({ currentPage: 1 });
    if (page > total) return set({ currentPage: total });

    set({ currentPage: page });
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),

  showNextProduct: () => {
    const { filteredProducts, selectedProduct } = get();
    const idx = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    if (idx === -1) return;
    const nextIdx = (idx + 1) % filteredProducts.length;
    set({ selectedProduct: filteredProducts[nextIdx] });
  },

  showPrevProduct: () => {
    const { filteredProducts, selectedProduct } = get();
    const idx = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    if (idx === -1) return;
    const prevIdx = (idx - 1 + filteredProducts.length) % filteredProducts.length;
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
  }
}));