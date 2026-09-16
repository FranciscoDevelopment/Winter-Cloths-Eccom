"use client"

import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { updateProduct } from "@/actions/update-product.action"

type childrenProps = Readonly< {children: React.ReactNode} >

const initialState = {
    errors: [] ,
    success: ""
} 


export default function EditProductForm ( {children} : childrenProps ) {

    const theRouter = useRouter() ;

    const params = useParams<{id: string}>();
    
    const {id} = params

    const updateProductWithId = updateProduct.bind(  null  , +id ) ;

    const [state, dispatch] = useActionState( updateProductWithId, initialState )


    useEffect( () => {

        if(state.errors) state.errors.forEach( (error) => toast.error(error) ) ;

        if( state.success ) {

            toast.success( state.success ) ;

            theRouter.push( "/admin/products" )
        }

    }, [state, theRouter] )

    return (

        <form className="space-y-5" action={dispatch} >

            {children}

            <input 
                type="submit"
                className="rounded bg-lime-400 font-bold py-2 w-full cursor-pointer"
                value="Edit Product"
            />

        </form>
    
    )
}