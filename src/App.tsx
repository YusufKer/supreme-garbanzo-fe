import './App.css'
import { useState } from 'react'
import { useProductContext } from './context/ProductsContext'
import { Product } from './api/Products'
import ProductCard from './components/Product/ProductCard'
import AddProduct from './components/Product/AddProduct'

function App() {

  const [openAddProductForm, setOpenAddProductForm] = useState(false);

  // TODO: TS issues to be sorted
  const { products } = useProductContext();

  const renderProducts = () => products.map((item:Product) => <ProductCard key={item.sku} {...item}/>) 

  return (
    <div id="App" className="min-x-screen min-h-screen mx-auto bg-gray-100 relative">
      <button onClick={() => setOpenAddProductForm(true)} className="bg-blue-500 px-10 py-2 rounded w-min hover:shadow absolute top-4 right-4">Add</button>
      <div className="container mx-auto auto-grid gap-4 p-4">
        { renderProducts() }
      </div>
      {
        openAddProductForm ? <AddProduct toggle={() => setOpenAddProductForm(prevState => !prevState)}/> : null
      }
    </div>
  )
}

export default App