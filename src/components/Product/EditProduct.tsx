import { useState, useRef, FormEvent } from "react"
import { Product } from "../../api/Products"

type Props  = {
    toggle: () => void
} & Product

type NewInput = {
    key: string,
    value: string
}

export default function EditProduct({toggle, sku, attributes}:Props){

    const [newAttributes, setNewAttributes] = useState<NewInput[]>([])

    const editProductFormRef = useRef<HTMLFormElement>(null)
    const newAttributeKeyRef = useRef<HTMLInputElement>(null)
    const newAttributeValueRef = useRef<HTMLInputElement>(null)

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

    function handleSubmit(e:FormEvent){
        e.preventDefault();
        const formData = new FormData(editProductFormRef.current as HTMLFormElement)
        console.log({formData})
    }

    return(
        <div onClick={toggle} className="absolute top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
            <form 
                onSubmit={handleSubmit}
                ref={editProductFormRef} 
                onClick={e => e.stopPropagation()} 
                className="flex gap-4 flex-col rounded-xl bg-gray-200 shadow-2xl w-full p-4 max-w-[500px] mx-4"
                >
                <div>
                    <h3>Edit SKU: {sku}</h3>
                </div>
                <hr className="border-white"/>
                <div className="flex-1 space-y-4">
                    {
                        Object.entries(attributes).map(([key,value]) => (
                            <div className="flex gap-4 items-center" key={key}>
                                <label className="block" htmlFor={key}>{key}</label>
                                {
                                    key === "size" ?
                                        <select data-edit name="" id="" className="rounded px-2 py-1" >
                                            <option value="XL">XL</option>
                                            <option value="L">L</option>
                                            <option value="M">M</option>
                                            <option value="S">S</option>
                                        </select>
                                    :    
                                        <input 
                                            data-edit
                                            type="text" 
                                            placeholder={value} 
                                            className="rounded px-2 py-1" 
                                            />
                                }
                            </div>
                        ))
                    }
                    <div className="grid gap-4 grid-cols-3">
                        <label htmlFor="AddAttribute" className="col-span-3">Add Attribute</label>
                        <input ref={newAttributeKeyRef} type="text" placeholder="key" className="rounded px-2 py-1" />
                        <input ref={newAttributeValueRef} type="text" placeholder="value" className="rounded px-2 py-1" />
                        <button onClick={addAttribute} className="bg-gray-300 px-10 rounded hover:shadow">Add</button>
                    </div>
                    <div>
                        <p>New Attributes:</p>
                        <ul>
                            { 
                                newAttributes.map(attribute => (
                                    <li className="flex justify-between border-b border-gray-400 py-2" key={attribute.key}>
                                        <span>{attribute.key}: {attribute.value}</span>
                                        <button onClick={() => removeNewAttribute(attribute.key)} className="bg-red-500 px-4 rounded">Delete</button>
                                    </li>
                                )) 
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <button onClick={() => toggle()} className="bg-red-500 px-10 py-2 mt-4 rounded w-min hover:shadow">Cancel</button>
                    <button type="submit" className="bg-green-500 px-10 py-2 mt-4 rounded w-min hover:shadow">Save</button>
                </div>
            </form>
        </div>
    )
}