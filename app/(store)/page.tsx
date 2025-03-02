import EidAlFitrBanner from "@/components/EidAlFitrBanner";
import ProductView from "@/components/ProductView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllPrducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllPrducts()
  const categories = await getAllCategories()

  return (
    <div>
      <EidAlFitrBanner />
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-2"> 
        <ProductView products={products} categories={categories}/>
      </div>
    </div>
  );
}
