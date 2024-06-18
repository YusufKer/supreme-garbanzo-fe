import { useState } from "react"
import { Product } from "../../api/Products"
import EditProduct from "./EditProduct"

export default function ProductCard({sku, attributes}:Product){

    const [openEditor, setOpenEditor] = useState(false)

    const renderAttributes = () => Object.entries(attributes).map(([key,value]) => (
        <li className="flex justify-between" key={key}>
            <p>{key}</p>
            <p>{value}</p>
        </li>
    ))

    return (
        <>
            <div className="p-4 flex flex-col rounded-xl bg-white shadow-2xl">
                <div>
                    <h3>SKU: {sku}</h3>
                </div>
                <hr className="my-4" />
                <div className="flex-1">
                    <ul>
                        { renderAttributes() }
                    </ul>
                </div>
                <button 
                    onClick={() => setOpenEditor(true)} 
                    className="bg-yellow-300 px-10 py-2 mt-4 rounded w-min self-end hover:shadow"
                >Edit</button>
            </div>
            {
                openEditor ? 
                    <EditProduct 
                        toggle={() => setOpenEditor(prevState => !prevState)} 
                        sku={sku} 
                        attributes={attributes}
                    /> 
                :
                    null
            }
            
        </>
    )
}