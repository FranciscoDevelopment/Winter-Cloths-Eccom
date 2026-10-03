"use client"

import { ChangeEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand";
import type { AuthResponseT, ErrorResponseT, LoginCredentialsT, RegisterCredentialsT, SessionResponseT } from "@/src/types/auth-responses.type"


function RegisterForm() {

    const router = useRouter() ;

    const searchParams = useSearchParams() ;

    const redirectTo = searchParams.get( "redirectTo" ) ?? "/" ;


    const [ credentials, setCredentials ] = useState<RegisterCredentialsT>( {email: "", password: "", name: ""} ) ;

    const [ isSubmitting, setIsSubmitting ] = useState(false) ;


    const handleSubmit = async ( event : React.FormEvent ) => {

        event.preventDefault()

        setIsSubmitting(true);


        const response = await fetch("/api/auth/register", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)

        })

        const data : SessionResponseT | ErrorResponseT = await response.json()
    
    
        setIsSubmitting(false) ;


        if( !response.ok ) {

            const errorData = data as ErrorResponseT

            const message = Array.isArray( errorData.message.message )  ?  errorData.message.message.join(", ")  :  errorData.message.message ;

            toast.error(message) ;


            return

        }

        const authData = data as SessionResponseT ;

        useAuthStore.getState().setSession( authData.user, authData.access_token ) ;

        router.push( redirectTo )

    }


    const handleOnNameChange = ( e : ChangeEvent<HTMLInputElement> ) => {
        setCredentials( {...credentials, name: e.target.value } ) ;
    }


    const handleOnEmailChange = ( e : ChangeEvent<HTMLInputElement> ) => {
        setCredentials( {...credentials, email: e.target.value} )
    }

    const handleOnPasswordChange = (e : ChangeEvent<HTMLInputElement>) => {
        setCredentials( {...credentials, password: e.target.value } )
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 flex flex-col gap-4" >

            <h2 className="text-2xl font-bold"> Login </h2>

            <input 
                type="text" 
                placeholder="Name"
                value={credentials.name}
                onChange={ handleOnNameChange } 
                required
                className="border p-2 rounded"               
            />


            <input 
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={ handleOnEmailChange }
                required
                className="border p-2 rounded"
            />

            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={ handleOnPasswordChange }
                required
                className="border p-2 rounded"
            />

            
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold p-3 rounded uppercase disabled:opacity-50"
            >
                {isSubmitting ? "Creating account" : "Register"}
            </button>


            <p className="text-sm text-center" >

                Already have an account?
                <Link href="/login" className="text-indigo-500 font-bold" >
                    Sign in
                </Link>

            </p>

        </form>
    )

}



export default function RegisterPage () {

    return (
        <Suspense fallback={null}>

            <RegisterForm/>
            
        </Suspense>
    )

}


