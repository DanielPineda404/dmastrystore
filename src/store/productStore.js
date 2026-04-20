import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
  allProducts: [],
  filteredProducts: [],
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 6,
  isLoading: false,

  // Función para traer datos de la API
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      set({ allProducts: data, filteredProducts: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ isLoading: false });
    }
  },

  setSearchTerm: (term) => {
    const { allProducts } = get();
    const filtered = term.trim() === '' 
      ? allProducts 
      : allProducts.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
    
    set({ searchTerm: term, filteredProducts: filtered, currentPage: 1 });
  },

  setCurrentPage: (page) => set({ currentPage: page }),

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