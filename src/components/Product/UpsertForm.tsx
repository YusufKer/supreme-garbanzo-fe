import { FormEvent, useState, useRef } from "react";
import { useProductContext } from "../../context/ProductsContext";
import { Product, addProduct } from "../../api/Products"

type Props = {
    type: "add" | "edit",
    product?:Product,
    submitCallBack?: () => void,
    cancelCallback?: () => void,
}

type NewInput = {
    key: string,
    value: string
}

export default function UpsertForm(props:Props){

    const {
        type, 
        product, 
        submitCallBack, 
        cancelCallback, 
    } = props;

    const [loading, setLoading] = useState(false);
    const [newAttributes, setNewAttributes] = useState<NewInput[]>([])
    const [localAttributes, setLocalAttributes] = useState(product?.attributes || {});

    const upsertProductFormRef = useRef<HTMLFormElement>(null)
    const newAttributeKeyRef = useRef<HTMLInputElement>(null)
    const newAttributeValueRef = useRef<HTMLInputElement>(null)

    const { refresh } = useProductContext();

    // REMOVE OLD ATTRIBUTE
    function removeOldAttribute(key:string){
        if(!localAttributes) return 
        const updatedAttributes = localAttributes
        delete updatedAttributes[key]
        setLocalAttributes({...updatedAttributes});
    }

    // CANCEL
    function cancel(){
        if(cancelCallback){
            cancelCallback()
        }
        refresh();
    }

    async function handleSubmit(e:FormEvent){
        e.preventDefault();
        const formData = new FormData(upsertProductFormRef.current as HTMLFormElement)
        const newProduct:Product = {
            sku:product?.sku || "",
            attributes:{}
        };

        
        for (const [key, value] of formData.entries()) {
            if(key === 'sku'){
                newProduct["sku"] = value as string
            }else{
                newProduct["attributes"][key] = value as string
            }
        }

        setLoading(true);

        try{
            await addProduct(newProduct);
            refresh()
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
            if(submitCallBack) submitCallBack()
        }
    }

    function addAttribute(){
        if(newAttributes.find(item => item.key === newAttributeKeyRef.current?.value)) return 
        if(newAttributeKeyRef.current?.value === "" || newAttributeValueRef.current?.value === "") return
        const newAttribute: NewInput = {
            key: newAttributeKeyRef.current?.value as string,
            value: newAttributeValueRef.current?.value as string
        }
        setNewAttributes(prevState => [...prevState, newAttribute])

        // @ts-ignore
        newAttributeKeyRef.current.value = "";
        // @ts-ignore
        newAttributeValueRef.current.value = "";
    }

    function removeNewAttribute(key:string){
        const filteredAttributes = newAttributes.filter(items => items.key !== key);
        setNewAttributes(filteredAttributes);
    }

    return(
        <form ref={upsertProductFormRef} onSubmit={handleSubmit} className="flex-1 space-y-4">
            {
                type === "edit" && product?.sku ? 
                    <div>
                        <h3>Edit SKU: {product.sku}</h3>
                    </div>
                : type === "add" ? 
                    <div className="flex gap-4 items-center" >
                        <label className="block" htmlFor="sku">SKU</label>
                        <input 
                            name="sku"
                            data-edit
                            type="text" 
                            className="rounded px-2 py-1" 
                        />
                    </div>
                : 
                    <p className="text-red-500">Error in calling component. <br/>Please see documentation</p>
            }
            <hr className="border-white"/>
            <div className="flex-1 space-y-4">
                {   
                    Object.entries(localAttributes).map(([key,value]) => (
                        <div className="grid grid-cols-3 gap-4 items-center" key={key}>
                            <label className="block" htmlFor={key}>{key}</label>
                            {
                                key === "size" ?
                                    <select name={key} data-edit id="" className="rounded px-2 py-1" >
                                        <option value="XL">XL</option>
                                        <option value="L">L</option>
                                        <option value="M">M</option>
                                        <option value="S">S</option>
                                    </select>
                                :    
                                    <input 
                                        name={key}
                                        data-edit
                                        type="text" 
                                        placeholder={value}
                                        defaultValue={value}
                                        className="rounded px-2 py-1" 
                                        />
                            }
                            <button onClick={() => removeOldAttribute(key)} type="button" className="bg-red-500 px-4 rounded">Delete</button>
                        </div>
                    ))
                }
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
                <button type="button" onClick={cancel} className="bg-red-500 px-10 py-2 mt-4 rounded w-min hover:shadow">Cancel</button>
                <button type="submit" disabled={loading} className="bg-green-500 px-10 py-2 rounded w-fit hover:shadow block ml-auto">{type === 'add' ? 'Add': 'Edit'} Product</button>
            </div>
        </form>
    )
}