"use client"

import { useActionState, useEffect } from "react"
import { addNewCategory } from "@/actions/add-category-action"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand"

type childrenProps = Readonly< {children: React.ReactNode} >

const initialState = {
    errors: [] ,
    success: ""
}


export default function NewCategoryForm ( {children} : childrenProps ) {

    const theRouter = useRouter() ;

    const accessToken = useAuthStore( (state) => state.accessToken ) ;


    const addNewCategoryWithToken = addNewCategory.bind(null, accessToken) ;

    const [ state, dispatch ] = useActionState( addNewCategoryWithToken, initialState ) ;


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
                className="rounded font-bold py-2 w-1/2 cursor-pointer block ml-auto bg-emerald-200/90 px-6 text-teal-800 transition-all duration-300 hover:bg-emerald-300/85 hover:shadow-md"
                value="Add Category"
            />

        </form>

    )
}
