import { Category, Product } from '@/sanity.types'
import ProductGrid from './ProductGrid';
import { CategorySelectorComponent } from './ui/category-selector';

interface ProductViewProps {
    products: Product[];
    categories: Category[];
  }
  
  const ProductView: React.FC<ProductViewProps> = ({ products, categories }) => {
    return (
        <div className='flex flex-col'>
            {/* categories */}
            <div className='ml-3 w-[200px] sm:[200px]'>
                <CategorySelectorComponent categories={categories} />
            </div>
            {/* products */}
            <div className='flex-1'>
                <div>
                    <ProductGrid products={products} />
                    <hr className='w-1/2 sm:w-3/4'/>
                </div>
            </div>
        </div>
    )

}
export default ProductView