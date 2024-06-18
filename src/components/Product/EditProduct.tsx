import { Product } from "../../api/Products"
import UpsertForm from "./UpsertForm"

type Props  = {
    toggle: () => void
} & Product

export default function EditProduct({toggle, sku, attributes}:Props){
    return(
        <div 
            onClick={toggle} 
            className="absolute top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
        >
            <div 
                onClick={e => e.stopPropagation()} 
                className="flex gap-4 flex-col rounded-xl bg-gray-200 shadow-2xl w-full p-4 max-w-[500px] mx-4"
            >
                <UpsertForm 
                    type="edit"
                    product={{sku,attributes}}
                    cancelCallback={toggle}
                    submitCallBack={toggle}
                /> 
            </div>
        </div>
    )
}