"use client"

import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { updateCategory } from "@/actions/update-category-action"
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand"

type childrenPropsT = Readonly<{children: React.ReactNode}> ;


const initialState = {
    errors: [],
    success: ""
}


export default function EditCategoryForm ( {children} : childrenPropsT ) {

    const theRouter = useRouter() ;

    
    const params = useParams< {id: string} >() ;


    const {id} = params ;


    const accessToken = useAuthStore( (state) => state.accessToken ) ;


    const updateCategoryWithId = updateCategory.bind( null, +id, accessToken ) ;


    const [ state, dispatch ] = useActionState( updateCategoryWithId, initialState )


    useEffect( () => {

        if(state.errors) state.errors.forEach( (error) => toast.error( error ) ) ;

        if( state.success ) {

            toast.success( state.success ) ;

            theRouter.push( "/admin/categories" ) ;

        }

    }, [ state, theRouter ] )



    return (
        <form action={dispatch} className="space-y-5">

            {children}

            <input 
                type="submit" 
                className="rounded bg-lime-400 font-bold py-2 w-full cursor-pointer"
                value="Edit Category"
            />

        </form>
    )


}