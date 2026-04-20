import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { MainLayout } from "./components/templates/MainLayout.jsx";
import { ProductGallery } from "./components/organisms/ProductGallery.jsx";
import { ShoppingCart } from "./components/organisms/ShoppingCart.jsx";
import { AuthSection } from "./components/organisms/AuthSection.jsx";
import { CheckoutPreview } from "./components/organisms/CheckoutPreview.jsx";
import { SuccessScreen } from "./components/organisms/SuccessScreen.jsx";
import { ProductDetailModal } from "./components/organisms/ProductDetailModal.jsx";
import { useProductStore } from "./store/productStore.js";

function App() {
  const [view, setView] = useState("shop"); 
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const navigateTo = (newView) => setView(newView);

  return (
    <MainLayout onNavigate={navigateTo}>
      <Toaster position="bottom-right" richColors /> 
      
      {/* Modal Global de Detalles */}
      <ProductDetailModal />

      {view === "shop" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Collections</h1>
              <p className="text-zinc-500 text-sm mt-1">Real-time data from FakeStore API.</p>
            </div>
            <ProductGallery />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ShoppingCart onCheckout={() => navigateTo("checkout")} />
            </div>
          </div>
        </div>
      )}

      {(view === "login" || view === "register") && (
        <div className="max-w-md mx-auto py-20">
          <AuthSection 
            initialMode={view} 
            onSuccess={() => navigateTo("shop")}
            onSwitchMode={(mode) => navigateTo(mode)} 
          />
        </div>
      )}

      {view === "checkout" && (
        <CheckoutPreview 
          onBack={() => navigateTo("shop")} 
          onSuccess={() => navigateTo("success")} 
        />
      )}

      {view === "success" && (
        <SuccessScreen onReturn={() => navigateTo("shop")} />
      )}
    </MainLayout>
  );
}

export default App;