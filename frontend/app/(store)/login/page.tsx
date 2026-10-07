"use client"

import { ChangeEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand";
import type { AuthResponseT, ErrorResponseT, LoginCredentialsT, SessionResponseT } from "@/src/types/auth-responses.type"


function LoginForm() {

    const router = useRouter() ;

    const searchParams = useSearchParams() ;

    const redirectTo = searchParams.get("redirectTo") ?? "/" ;


    const [ credentials, setCredentials ] = useState<LoginCredentialsT>({email: "", password: ""}) ;

    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleSubmit = async ( event : React.FormEvent ) => {

        event.preventDefault()

        setIsSubmitting(true)


        const response = await fetch( "/api/auth/login", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)

        } )


        const data : SessionResponseT | ErrorResponseT = await response.json()


        setIsSubmitting(false) ;


        if( !response.ok ) {

            const errorData = data as Partial<ErrorResponseT>

            const rawMessage = errorData.message?.message

            const message = Array.isArray(rawMessage)
                ? rawMessage.join(", ")
                : rawMessage ?? "No se pudo iniciar sesión. Intentá de nuevo."

            toast.error(message)


            return 
        }
     

        const authData = data as SessionResponseT ;

        useAuthStore.getState().setSession( authData.user, authData.access_token ) ;


        router.push( redirectTo )
 
    }
    

    const handleOnEmailChange = ( e : ChangeEvent<HTMLInputElement> ) => setCredentials({ ...credentials, email: e.target.value })

    const handleOnPasswordChange = ( e : ChangeEvent<HTMLInputElement> ) => {

        setCredentials( 
            {
                ...credentials, 
                password: e.target.value
            } 
        )

    }

    return(

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 flex flex-col gap-4">

            <h2 className="text-2xl font-bold" >Sign In</h2>


            <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={ handleOnEmailChange }
                className="border p-2 rounded"
                required
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
                {isSubmitting ? "Signing in..." : "Sign in"}
            </button>


            <p className="text-md text-center" >

                Don't have an account?
                <Link
                    href="/register"
                    className="text-indigo-500 font-bold m-2"
                >
                    Register
                </Link>

            </p>

        </form>

    )

}


export default function LoginPage() {

    return (
        <Suspense fallback={null} >

            <LoginForm/>

        </Suspense>
    )

}