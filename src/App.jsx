import { useState, useEffect } from "react"; // <--- Agregamos useEffect
import { MainLayout } from "./components/templates/MainLayout.jsx";
import { ProductGallery } from "./components/organisms/ProductGallery.jsx";
import { ShoppingCart } from "./components/organisms/ShoppingCart.jsx";
import { AuthSection } from "./components/organisms/AuthSection.jsx";
import { CheckoutPreview } from "./components/organisms/CheckoutPreview.jsx";
import { useCartStore } from "./store/cartStore.js";
import { useProductStore } from "./store/productStore.js"; // <--- Importamos productStore

function App() {
  const [view, setView] = useState("shop");
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  // Llamada a la API al montar el componente
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <MainLayout>
      {view === "shop" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Collections</h1>
              <p className="text-zinc-500 text-sm mt-1">Real-time data from FakeStore API.</p>
            </div>
            <ProductGallery />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <AuthSection />
            <div className="sticky top-24">
              <ShoppingCart onCheckout={() => setView("checkout")} />
            </div>
          </div>
        </div>
      ) : (
        <CheckoutPreview onBack={() => setView("shop")} />
      )}
    </MainLayout>
  );
}

export default App;