export type Product = {
    sku: string,
    attributes: Record<string, string>
}

export async function fetchAllProducts():Promise<Product[]>{
    try {
        const response = await fetch('http://127.0.0.1:5000/products')
        const products:Product[] = await response.json()
        return products
    } catch(error) {
        console.log(error)
        return []
    }
}

export async function addProduct(product:Product){
    try{
        
        const response = await fetch(`http://127.0.0.1:5000/products/${product.sku}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        })

        return await response.json()

    } catch(error){
        return error
    }
}