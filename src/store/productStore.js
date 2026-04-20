import { create } from 'zustand';
import { fetchAllProducts } from '../services/productService';

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

  // Carga inicial de productos
  fetchProducts: async () => {
    set({ isLoading: true });
    const data = await fetchAllProducts();
    
    // Extraer categorías únicas directamente de los datos reales
    const uniqueCategories = ['all', ...new Set(data.map(p => p.category))];
    
    set({ 
      allProducts: data, 
      filteredProducts: data, 
      categories: uniqueCategories, 
      isLoading: false,
      currentPage: 1 
    });
  },

  // Sistema de filtrado robusto
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

    // Crucial: Resetear a página 1 al filtrar para evitar pantallas vacías
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

  // Control de paginación con candados
  setCurrentPage: (page) => {
    const total = get().getTotalPages();
    if (page < 1) return set({ currentPage: 1 });
    if (page > total) return set({ currentPage: total });
    set({ currentPage: page });
  },

  // Navegación del Modal (Detalle de Producto)
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

  // Helpers para la UI
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