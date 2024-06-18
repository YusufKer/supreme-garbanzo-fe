import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Product, fetchAllProducts } from "../api/Products";

type ProductContextType = {
    products: Product[],
    singleProduct: (sku:string) => Product | undefined,
    refresh: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function useProductContext():ProductContextType{
    return useContext(ProductContext) as ProductContextType
}

export function ProductContextProvider({ children }:{children:ReactNode}){

    const [products, setProducts] = useState<Product[]>([])
    const [reload, setReload] = useState(0);

    function singleProduct(sku:string):Product | undefined{
        return products.find(product => product.sku === sku)
    }

    function refresh(){
        setReload(prevState => prevState += 1);
    }

    useEffect(() => {
        const fetchData = async () => {
            const products = await fetchAllProducts()
            setProducts(products)
        }
        fetchData()
    },[reload])

    return (
        <ProductContext.Provider value={{products,singleProduct, refresh}}>
            {children}
        </ProductContext.Provider>
    )
}
