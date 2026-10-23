"use client"
import { deleteProduct } from "@/actions/delete-product-action"
import { productT } from "@/src/schema"
import { useState } from "react";


type productDeleteFormPropsT = {
    productId : productT['id'],
    accessToken : string | null ,
    canDelete : boolean ,
}

const CONFIRMATION_PHRASE = "delete product" as const ;


export default function DeleteProductForm ( {productId, accessToken, canDelete} : productDeleteFormPropsT  ) {

    const [ isOpen, setIsOpen ] = useState(false)

    const [ confirmationText, setConfirmationText ] = useState("")


    const handleDeleteProduct = deleteProduct.bind( null, productId, accessToken )
    // (...restoDeArgumentos) => deleteProduct( productId, accessToken, ...restoDeArgumentos )


    const isConfirmed = confirmationText.trim().toLocaleLowerCase() === CONFIRMATION_PHRASE ;


    const handleClose = () => {

        setIsOpen(false);

        setConfirmationText("")

    }
    

    return(
        
        <main>

            <button
                type="button"
                onClick={ () => canDelete && setIsOpen(true) }
                disabled={ !canDelete }
                title={ !canDelete ? "Can't delete: this product has purchases history. Disableit instead." : undefined }
                className="text-red-700 hover:text-red-800 cursor-pointer my-2 p-2 bg-pink-50 text-md font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Delete
            </button>

            {
                isOpen && (
                    
                    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" >

                        <article className="bg-zinc-100 rounded-lg shadow-lg p-4 w-full max-w-sm space-y-4">

                            <h2 className="text-lg text-start font-bold text-gray-900">Delete product</h2>

                            <p className="text-sm text-gray-600 text-center" >
                                This action can't be undone.<br/> Type <span className="font-bold">&quot;{CONFIRMATION_PHRASE}&quot;</span> to confirm.
                            </p>

                            <form action={handleDeleteProduct} className="space-y-4">

                                <input 
                                    type="text"
                                    value={confirmationText}
                                    onChange={ (e) => setConfirmationText(e.target.value) }
                                    placeholder={CONFIRMATION_PHRASE}
                                    className="border border-gray-300 w-full p-2"
                                    autoFocus
                                    
                                />

                                <aside className="flex justify-end gap-3" >

                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="rounded py-2 px-6 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>

                                    
                                    <button
                                        type="submit"
                                        disabled={!isConfirmed}
                                        className="rounded py-2 px-6 font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Confirm Delete
                                    </button>


                                </aside>

                            </form>

                        </article>

                    </section>
                )
            }


        </main>

    
    )
}