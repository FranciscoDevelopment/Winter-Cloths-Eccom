"use client"

import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function AuthNavButton () {

    const user = useAuthStore( (state) => state.user )

    const hasHydrated = useAuthStore( (state) => state.hasHydrated ) ;

    const router = useRouter() ;


    const [ isOpen, setIsOpen ] = useState(false)


    const containerRef = useRef<HTMLElement>(null)


    useEffect( () => {

        const handleClickOutside = ( event : MouseEvent ) => {

            if( containerRef.current && !containerRef.current.contains(event.target as Node) ) {

                setIsOpen(false)

            }

        }

        document.addEventListener("mousedown", handleClickOutside) ;

        return () => document.removeEventListener("mousedown", handleClickOutside)

    }, [] )


    const handleLogout = async () => {

        const accessToken = useAuthStore.getState().accessToken ;


        await fetch( "/api/auth/logout", {

            method: "POST",
            headers: accessToken ? {Authorization: `Bearer ${accessToken}`} : undefined

        } )


        useAuthStore.getState().clearSession() ;


        setIsOpen(false)


        router.push("/")

        router.refresh()

    }


    if( !hasHydrated ) return <article className="w-9 h-9 rounded-full bg-slate-600 animate-pulse" />; // evita el parpadeo mientras el bootstrap todavía está chequeando


    if( !user ) {

        return (
            <Link href="/login" className="text-slate-100 rounded-full hover:text-teal-600 p-2" aria-label="Sign in">
                <UserIcon className="w-9 h-9 p-1.5 rounded-full border-2 border-slate-400/60 hover:border-teal-600" />
            </Link>
        )

    }


    return (

        <section className="relative self-center" ref={containerRef} >

            <button
                type="button"
                onClick={ () => setIsOpen( (prev) => !prev ) }
                className="text-amber-100 hover:text-teal-600 p-2 flex items-center gap-1"
                aria-label="My Account"
                aria-expanded={isOpen}
            >
                <UserIcon className="w-9 h-9 p-1.5 rounded-full border border-slate-400/60 hover:border-teal-600" />
                <span className="text-sm font-semibold">{user.name}</span>
            </button>

            <article
                className={`
                    absolute top-full left-0 mt-2 w-32 bg-teal-50 rounded-lg shadow-lg z-50 origin-top overflow-hidden
                    transition-all duration-700 ease-out divide-y divide-slate-300/70
                    ${ isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1 pointer-events-none" }
                `}
            >

                {
                    user.role === "ADMIN" && (

                        <div className="divide-y divide-slate-300/70" >
                            
                            <Link
                                href="/admin/products"
                                onClick={ () => setIsOpen(false) }
                                className="block px-4 py-2 text-sm text-slate-800 hover:bg-amber-300"
                            >
                                <span className="font-semibold">Admin: </span> Edit Products
                            </Link>


                            <Link
                                href="/admin/sales"
                                onClick={ () => setIsOpen(false) }
                                className="block px-4 py-2 text-sm text-slate-800 hover:bg-amber-300"
                            >
                                <span className="font-semibold">Admin: </span>View All Orders
                            </Link>

                        </div>

                    )
                }


                <Link
                    href="/account/orders"
                    onClick={ () => setIsOpen(false) }
                    className="block px-4 py-2 text-sm text-slate-800 hover:bg-amber-300 bg-"
                >
                    My Orders
                </Link>

                <Link
                    href="/account"
                    onClick={ () => setIsOpen(false) }
                    className="block px-4 py-2 text-sm text-slate-800 hover:bg-amber-300 bg-"
                >
                    Edit Profile
                </Link>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-amber-100 bg-"
                >
                    Log Out
                </button>

            </article>

        </section>

    )

}
