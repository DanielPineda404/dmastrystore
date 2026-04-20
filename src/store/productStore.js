import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
  allProducts: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: 'all',
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 6,
  isLoading: false,
  
  // Estado para el Modal de Detalle
  selectedProduct: null,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      const uniqueCategories = ['all', ...new Set(data.map(p => p.category))];
      set({ 
        allProducts: data, 
        filteredProducts: data, 
        categories: uniqueCategories, 
        isLoading: false 
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ isLoading: false });
    }
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  
  clearSelectedProduct: () => set({ selectedProduct: null }),

  setCategory: (category) => {
    const { allProducts, searchTerm } = get();
    let filtered = allProducts;
    if (category !== 'all') filtered = filtered.filter(p => p.category === category);
    if (searchTerm) filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    set({ selectedCategory: category, filteredProducts: filtered, currentPage: 1 });
  },

  setSearchTerm: (term) => {
    const { allProducts, selectedCategory } = get();
    let filtered = allProducts;
    if (selectedCategory !== 'all') filtered = filtered.filter(p => p.category === selectedCategory);
    if (term.trim() !== '') filtered = filtered.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
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