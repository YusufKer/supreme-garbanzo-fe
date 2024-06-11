import { useState } from "react"
import { Product } from "../../api/Products"

type Props = {
    toggle: () => void
}

export default function AddProduct({toggle}:Props){

    const [newAttributes, setNewAttributes] = useState<Product["attributes"][]>([{test:'yep'}])

    return (
        <div onClick={toggle} className="absolute top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
            <div onClick={e => e.stopPropagation()} className="flex gap-4 flex-col rounded-xl bg-gray-200 shadow-2xl w-full p-4 max-w-[500px] mx-4">
                <div>
                    <h3>ADD NEW PRODUCT</h3>
                </div>
                <hr className="border-white"/>
                <form className="flex-1 space-y-4">
                    <div className="flex gap-4 items-center" >
                        <label className="block" htmlFor="sku">SKU</label>
                            <input 
                                data-edit
                                type="text" 
                                className="rounded px-2 py-1" 
                                />
                    </div>
                    <div>
                        <p>Add Attribute:</p>
                        <ul>
                            {
                                newAttributes.map(({key,value}) => <li key={key}>{key}:{value}</li>)
                            }
                        </ul>
                    </div>
                    <button className="bg-green-500 px-10 py-2 rounded w-min hover:shadow block ml-auto">Add</button>
                </form>
            </div>
        </div>
    )
}