const FAKESTORE_API = 'https://fakestoreapi.com/products';

const normalizeProduct = (product) => ({
  id: `fs-${product.id}`,
  title: product.title,
  price: product.price,
  description: product.description,
  image: product.image,
  category: product.category,
  rating: product.rating || { rate: 0, count: 0 },
});

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(FAKESTORE_API);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.map(normalizeProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};