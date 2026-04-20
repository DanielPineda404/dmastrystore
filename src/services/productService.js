/**
 * Servicio unificado de productos.
 * Aquí centralizamos las llamadas a APIs para que el Store no dependa de URLs externas.
 */

const FAKESTORE_URL = 'https://fakestoreapi.com/products';

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(FAKESTORE_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();

    // Normalizamos los datos para asegurar que siempre tengan la estructura que React espera
    return data.map(product => ({
      id: `fs-${product.id}`, // Prefijo para evitar conflictos de ID
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      rating: product.rating || { rate: 0, count: 0 }
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};