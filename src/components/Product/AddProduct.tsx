import { FormEvent, useState, useRef } from "react"
import { Product } from "../../api/Products"
import { addProduct } from "../../api/Products"
import { useProductContext } from "../../context/ProductsContext"

type Props = {
    toggle: () => void
}

type NewInput = {
    key: string,
    value: string
}

export default function AddProduct({toggle}:Props){

    const [loading, setLoading] = useState(false);
    const [newAttributes, setNewAttributes] = useState<NewInput[]>([])

    const addProductFormRef = useRef<HTMLFormElement>(null)
    const newAttributeKeyRef = useRef<HTMLInputElement>(null)
    const newAttributeValueRef = useRef<HTMLInputElement>(null)

    const { refresh } = useProductContext();

    function addAttribute(){
        if(newAttributes.find(item => item.key === newAttributeKeyRef.current?.value)) return 
        if(newAttributeKeyRef.current?.value === "" || newAttributeValueRef.current?.value === "") return
        const newAttribute: NewInput = {
            key: newAttributeKeyRef.current?.value as string,
            value: newAttributeValueRef.current?.value as string
        }
        setNewAttributes(prevState => [...prevState, newAttribute])

        // TODO: TS issues to be sorted
        newAttributeKeyRef.current.value = "";
        newAttributeValueRef.current.value = "";
    }

    function removeNewAttribute(key:string){
        const filteredAttributes = newAttributes.filter(items => items.key !== key);
        setNewAttributes(filteredAttributes);
    }

    async function handleSubmit(e:FormEvent){
        e.preventDefault();
        const formData = new FormData(addProductFormRef.current as HTMLFormElement)
        const product:Product = {
            sku:'',
            attributes:{}
        };
        
        for (const [key, value] of formData.entries()) {
            if(key === 'sku'){
                product["sku"] = value as string
            }else{
                product["attributes"][key] = value as string
            }
        }

        setLoading(true);

        try{
            await addProduct(product);
            refresh()
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
            toggle();
        }
    }

    return (
        <div onClick={toggle} className="absolute top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
            <div onClick={e => e.stopPropagation()} className="relative flex gap-4 flex-col rounded-xl bg-gray-200 shadow-2xl w-full p-4 max-w-[500px] mx-4">
                <div>
                    <h3>ADD NEW PRODUCT</h3>
                </div>
                <hr className="border-white"/>
                <form ref={addProductFormRef} onSubmit={handleSubmit} className="flex-1 space-y-4">
                    <div className="flex gap-4 items-center" >
                        <label className="block" htmlFor="sku">SKU</label>
                        <input 
                            name="sku"
                            data-edit
                            type="text" 
                            className="rounded px-2 py-1" 
                            />
                    </div>
                    <hr className="border-white"/>
                    <div className="flex-1 space-y-4">
                        <p>Add Attribute:</p>
                        <ul>
                            <li className="grid grid-cols-3 gap-4">
                                <input ref={newAttributeKeyRef} className="rounded px-2 py-1" type="text" placeholder="key"/>
                                <input ref={newAttributeValueRef} className="rounded px-2 py-1" type="text" placeholder="value"/>
                                <button type="button" onClick={addAttribute} className="bg-gray-300 px-10 rounded hover:shadow">Add</button>
                            </li>
                        </ul>
                        <p>Attributes</p>
                        <ul>
                            {
                                newAttributes.map(attribute => (
                                    <li className="grid grid-cols-3 border-b border-gray-400 py-2 gap-2" key={attribute.key}>
                                        <label htmlFor={attribute.key} className="min-w-10">{attribute.key}</label>
                                        <input type="text" name={attribute.key} defaultValue={attribute.value} className="rounded px-2 py-1"/>
                                        <button type="button" onClick={() => removeNewAttribute(attribute.key)} className="bg-red-500 px-4 rounded">Delete</button>
                                    </li>
                                )) 
                            }
                        </ul>
                    </div>
                    <div className="flex justify-between w-full">
                        <button type="button" onClick={() => toggle()} className="bg-red-500 px-10 py-2 mt-4 rounded w-min hover:shadow">Cancel</button>
                        <button type="submit" disabled={loading} className="bg-green-500 px-10 py-2 rounded w-fit hover:shadow block ml-auto">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}