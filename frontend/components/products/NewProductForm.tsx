"use client"

import { useActionState, useEffect } from "react"
import ProductForm from "./ProductForm"
import { addNewProduct } from "@/actions/add-product-action"
import { toast } from "react-toastify"

type childrenProps = Readonly< {children: React.ReactNode} >

const initialState = {
    errors: [] ,
    success: ""
} 


export default function NewProductForm ( {children} : childrenProps ) {

    const [ state, dispatch ] = useActionState( addNewProduct, initialState ) ;

    useEffect( () => {

        if(state.errors) {
            state.errors.forEach( (error) => toast.error(error) )
        }

    }, [state] )

    return(

        <form className="space-y-5" action={dispatch} >

            {children}

            <input 
                type="submit"
                className="rounded bg-lime-400 font-bold py-2 w-full cursor-pointer"
                value="Add Product"

            />


        </form>
    
    )
}