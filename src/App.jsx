import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { MainLayout } from "./components/templates/MainLayout.jsx";
import { ProductGallery } from "./components/organisms/ProductGallery.jsx";
import { ShoppingCart } from "./components/organisms/ShoppingCart.jsx";
import { AuthSection } from "./components/organisms/AuthSection.jsx";
import { CheckoutPreview } from "./components/organisms/CheckoutPreview.jsx";
import { SuccessScreen } from "./components/organisms/SuccessScreen.jsx";
import { ProductDetailModal } from "./components/organisms/ProductDetailModal.jsx";
import { CartDrawer } from "./components/organisms/CartDrawer.jsx";
import { useProductStore } from "./store/productStore.js";
import { useUserStore } from "./store/userStore.js";

const PROTECTED_VIEWS = ["checkout"];

function App() {
  const [view, setView] = useState("shop");
  const fetchProducts = useProductStore(state => state.fetchProducts);
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const navigateTo = (newView) => {
    if (PROTECTED_VIEWS.includes(newView) && !isLoggedIn) {
      toast.error("Please sign in to continue with your purchase");
      setView("login");
      return;
    }
    setView(newView);
  };

  return (
    <MainLayout onNavigate={navigateTo}>
      <Toaster position="bottom-right" richColors />

      <ProductDetailModal />
      <CartDrawer onCheckout={() => navigateTo("checkout")} />

      {view === "shop" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Collections</h1>
              <p className="text-zinc-500 text-sm mt-1">Explore our exclusive selection.</p>
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
            onSwitchMode={mode => navigateTo(mode)}
          />
        </div>
      )}

      {view === "checkout" && isLoggedIn && (
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