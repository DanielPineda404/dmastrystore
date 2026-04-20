import { create } from 'zustand';
import { fetchAllSources } from '../services/productService'; // Importamos el servicio

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
    // Llamamos a nuestro servicio unificado
    const data = await fetchAllSources(); 
    
    const uniqueCategories = ['all', ...new Set(data.map(p => p.category))];
    
    set({ 
      allProducts: data, 
      filteredProducts: data, 
      categories: uniqueCategories, 
      isLoading: false 
    });
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),

  showNextProduct: () => {
    const { filteredProducts, selectedProduct } = get();
    const idx = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    const nextIdx = (idx + 1) % filteredProducts.length;
    set({ selectedProduct: filteredProducts[nextIdx] });
  },

  showPrevProduct: () => {
    const { filteredProducts, selectedProduct } = get();
    const idx = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    const prevIdx = (idx - 1 + filteredProducts.length) % filteredProducts.length;
    set({ selectedProduct: filteredProducts[prevIdx] });
  },

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