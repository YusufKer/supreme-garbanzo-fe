import UpsertForm from "./UpsertForm";

type Props = {
    toggle: () => void
}

export default function AddProduct({toggle}:Props){

    return (
        <div 
            onClick={toggle} 
            className="absolute top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
        >
            <div 
                onClick={e => e.stopPropagation()} 
                className="relative flex gap-4 flex-col rounded-xl bg-gray-200 shadow-2xl w-full p-4 max-w-[500px] mx-4"
            >
                <div>
                    <h3>ADD NEW PRODUCT</h3>
                </div>
                <hr className="border-white"/>
                <UpsertForm
                    type="add"
                    submitCallBack={toggle}
                    cancelCallback={toggle}
                />
            </div>
        </div>
    )
}