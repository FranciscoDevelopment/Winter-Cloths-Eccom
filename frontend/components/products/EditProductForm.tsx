"use client"

import { useActionState, useEffect } from "react"
import ProductForm from "./ProductForm"
import { addNewProduct } from "@/actions/add-product-action"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

type childrenProps = Readonly< {children: React.ReactNode} >

const initialState = {
    errors: [] ,
    success: ""
} 


export default function EditProductForm ( {children} : childrenProps ) {

    const theRouter = useRouter() ;

    //const [ state, dispatch ] = useActionState( addNewProduct, initialState ) ;

    /*useEffect( () => {

        if(state.errors) {
            state.errors.forEach( (error) => toast.error(error) )
        }

        if( state.success ) {
            
            toast.success( state.success ) 
            
            theRouter.push("/admin/products")
        }


    }, [state] )

    */

    return (

        <form className="space-y-5" >

            {children}

            <input 
                type="submit"
                className="rounded bg-lime-400 font-bold py-2 w-full cursor-pointer"
                value="Edit Product"
                
            />


        </form>
    
    )
}