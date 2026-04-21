import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { MainLayout } from '../components/templates/MainLayout.jsx';
import { ProductGallery } from '../components/organisms/ProductGallery.jsx';
import { ShoppingCart } from '../components/organisms/ShoppingCart.jsx';
import { ProductDetailModal } from '../components/organisms/ProductDetailModal.jsx';
import { CartDrawer } from '../components/organisms/CartDrawer.jsx';
import { useProductStore } from '../store/productStore.js';

export const ShopPage = () => {
  const fetchProducts = useProductStore(state => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <MainLayout>
      <Toaster position="bottom-right" richColors />

      <ProductDetailModal />
      <CartDrawer />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Colecciones</h1>
            <p className="text-zinc-500 text-sm mt-1">Explora nuestra selección exclusiva.</p>
          </div>
          <ProductGallery />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <ShoppingCart />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
