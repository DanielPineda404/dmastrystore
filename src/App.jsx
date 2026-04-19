import { MainLayout } from "./components/templates/MainLayout";
import { ProductGallery } from "./components/organisms/ProductGallery";
import { ShoppingCart } from "./components/organisms/ShoppingCart";

function App() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Store Front</h1>
            <p className="text-zinc-500 mt-2">Minimalist items for your daily life.</p>
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
}

export default App;