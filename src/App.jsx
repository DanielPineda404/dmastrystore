import { MainLayout } from "./components/templates/MainLayout";
import { ProductGallery } from "./components/organisms/ProductGallery";

function App() {
  return (
    <MainLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">New Arrivals</h1>
        <p className="text-zinc-500 mt-2">Explore the latest minimalist essentials.</p>
      </div>
      
      <ProductGallery />
    </MainLayout>
  );
}

export default App;