"use client"

import Link from "next/link"
import { useActionState, useEffect } from "react"
import { updateProfile } from "@/actions/update-profile-action"
import { toast } from "react-toastify"
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand"
import type { UserT } from "@/src/types/auth-responses.type"

type childrenProps = Readonly< {children: React.ReactNode} >

type actionStateT = {
    errors : string[] ;
    success : string ;
    updatedUser? : UserT
}

const initialState : actionStateT = {
    errors: [] ,
    success: ""
}


export default function EditProfileForm ( {children} : childrenProps ) {

    const accessToken = useAuthStore( (state) => state.accessToken ) ;

    const user = useAuthStore( (state) => state.user ) ;

    const hasHydrated = useAuthStore( (state) => state.hasHydrated ) ;


    const updateProfileWithToken = updateProfile.bind( null, accessToken ) ;

    const [ state, dispatch ] = useActionState( updateProfileWithToken, initialState ) ;


    useEffect( () => {

        if( state.errors?.length ) {
            state.errors.forEach( (error) => toast.error(error) )
        }

        if( state.success && state.updatedUser && accessToken ) {

            toast.success( state.success )

            useAuthStore.getState().setSession( state.updatedUser, accessToken )

        }

    }, [state, accessToken] )


    if( !hasHydrated ) return null ;


    if( !user ) {

        return (
            <p className="text-lg">
                You need to <Link href="/login" className="text-indigo-600 font-bold">sign in</Link> to edit your profile.
            </p>
        )

    }


    return(

        <form className="space-y-5" action={dispatch} >

            {children}

            <input
                type="submit"
                className="rounded bg-lime-400 font-bold py-2 w-full cursor-pointer"
                value="Save Changes"
            />

        </form>

    )
}
