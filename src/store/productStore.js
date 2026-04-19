import { create } from 'zustand';
import { mockProducts } from '../mockdata/products';

export const useProductStore = create((set, get) => ({
  allProducts: mockProducts,
  filteredProducts: mockProducts,
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 4,

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