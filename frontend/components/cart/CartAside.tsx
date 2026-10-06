"use client"

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation"
import ShoppingCart from "./ShoppingCart";
import React from "react";

type childrenProps = {
    children : React.ReactNode
}

export default function StoreContent  ( {children} : childrenProps ) {

    const pathname = usePathname() ;

    const isOrdersRoute = pathname === "/account/orders" ;

    const isAuthRoute = pathname === "/login" || pathname === "/register" || pathname === "/account" ; //  👈 nuevo: login/register no llevan carrito


    if( isAuthRoute ) {

        return (
            <article className="w-full md:h-screen md:overflow-y-scroll pt-10 pb-32 px-10" >
                {children}
            </article>
        )

    }

    
    if( isOrdersRoute ) {

        return(
            <section className="relative w-full md:h-screen md:overflow-y-scroll pt-2 pb-32 px-10">
                
                <article className="absolute top-4 right-10" >

                    <ShoppingCart/>

                </article>
            
                {children}

            </section>
        )

    }



    return (
        
        <section className="md:grid md:grid-cols-[minmax(0,1fr)_24rem] md:h-screen md:overflow-hidden" >

            <article className="md:h-screen md:overflow-y-scroll pt-10 pb-32 px-10" >
                {children}
            </article>

            <aside className="md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-stone-100" >
                <ShoppingCart/>
            </aside>

        </section>

    )


}