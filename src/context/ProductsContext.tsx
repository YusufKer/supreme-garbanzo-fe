import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Product, fetchAllProducts } from "../api/Products";

type ProductContext = {
    products: Product[],
    singleProduct: (sku:string) => Product | undefined
}

const ProductContext = createContext<ProductContext | undefined>(undefined)

export function useProductContext(){
    return useContext(ProductContext)
}

export function ProductContextProvider({ children }:{children:ReactNode}){

    const [products, setProducts] = useState<Product[]>([])

    function singleProduct(sku:string):Product | undefined{
        return products.find(product => product.sku === sku)
    }

    useEffect(() => {
        const fetchData = async () => {
            const products = await fetchAllProducts()
            setProducts(products)
        }
        fetchData()
    },[])

    return (
        <ProductContext.Provider value={{products,singleProduct}}>
            {children}
        </ProductContext.Provider>
    )
}
