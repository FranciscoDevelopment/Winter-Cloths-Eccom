"use client"

import { useActionState, useEffect } from "react"
import { addNewProduct } from "@/actions/add-product-action"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand"

type childrenProps = Readonly< {children: React.ReactNode} >

const initialState = {
    errors: [] ,
    success: ""
} 


export default function NewProductForm ( {children} : childrenProps ) {

    const theRouter = useRouter() ;

    const accessToken = useAuthStore( (state) => state.accessToken ) ;

    
    const addNewProductWithToken = addNewProduct.bind(null, accessToken) ;

    const [ state, dispatch ] = useActionState( addNewProductWithToken, initialState ) ;


    useEffect( () => {

        if(state.errors) {
            state.errors.forEach( (error) => toast.error(error) )
        }

        if( state.success ) {
            
            toast.success( state.success ) 
            
            theRouter.push("/admin/products")
        }


    }, [state, theRouter] )

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