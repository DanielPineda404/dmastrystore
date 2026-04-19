import { MainLayout } from "./components/templates/MainLayout.jsx";
import { ProductGallery } from "./components/organisms/ProductGallery.jsx";
import { ShoppingCart } from "./components/organisms/ShoppingCart.jsx";
import { AuthSection } from "./components/organisms/AuthSection.jsx";

function App() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Collections</h1>
            <p className="text-zinc-500 text-sm mt-1">Carefully curated minimalist essentials.</p>
          </div>
          <ProductGallery />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <AuthSection />
          <div className="sticky top-24">
            <ShoppingCart />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;