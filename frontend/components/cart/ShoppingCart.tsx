"use client"

import { usePathname } from "next/navigation"
import { useStore } from "@/src/store-zustand/store-zustand"
import ProductsInCartSection from "./ProductsInCartSection"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"

export default function ShoppingCart () {

    const contents = useStore( (state) => state.contents ) ;

    const pathname = usePathname() ;

    const isOrdersRoute = pathname === "/account/orders" ;


    if( contents.length === 0 ) {
        return ( <main> <p className="text-xl text-center text-gray-900">The cart is empty</p> </main> ) ;
    }

    if( isOrdersRoute ) {
        return (
            <main className="flex items-center justify-center gap-2 text-gray-900">
                <ShoppingCartIcon className="w-8 h-8" />
                <span className="text-lg font-bold rounded-full border border-gray-800">{contents.length}</span>
            </main>
        )
    }

    return ( <main> <ProductsInCartSection /> </main> );

}