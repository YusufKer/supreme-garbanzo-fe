import './App.css'
import { useProductContext } from './context/ProductsContext'
import ProductCard from './components/Product/ProductCard'
import { Product } from './api/Products'

function App() {

  const { products } = useProductContext();

  const renderProducts = () => products.map((item:Product) => <ProductCard key={item.sku} {...item}/>) 

  return (
    <div id="App" className="min-x-screen min-h-screen mx-auto bg-gray-100 relative">
      <div className="container mx-auto auto-grid gap-4 p-4">
        { renderProducts() }
      </div>
    </div>
  )
}

export default App