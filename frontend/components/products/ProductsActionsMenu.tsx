"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { productT } from "@/src/schema"
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand"
import DeleteProductForm from "./DeleteProductForm"
import { Inter } from "next/font/google"
import DeactivateProductForm from "./DeactivateProductForm"

type productActionsMenuPropsT = {

    productId : productT['id']

    productName : productT['name'] ,

    canDelete : boolean ,

    isActive : boolean

}
const inter = Inter( { subsets: ["latin"] } )

export default function ProductActionMenu ( {productId, productName, canDelete, isActive} : productActionsMenuPropsT ) {

    const accessToken = useAuthStore( (state) => state.accessToken ) ;

    
    const [ isOpen, setIsOpen ] = useState(false)


    const containerRef = useRef<HTMLElement>(null) ;


    useEffect( () => {

        const handleClickOutside = ( event : MouseEvent ) => {

            if( containerRef.current && !containerRef.current.contains(event.target as Node) ) {
                setIsOpen(false)
            }

        }
        

        document.addEventListener("mousedown", handleClickOutside) ;


        return () => document.removeEventListener("mousedown", handleClickOutside)

    }, [] )





    return (


        <main className={`${inter.className} flex flex-col gap-1 justify-center items-start divide-y divide-slate-400/70`}>

            <Link
                href={`/admin/products/${productId}/edit`}
                className="text-indigo-700 hover:text-indigo-800 rounded-xl p-2 my-2 bg-green-50 text-lg font-semibold"
            >
                Edit <span className="sr-only">{productName}</span>
            </Link>

            <DeactivateProductForm productId={productId} accessToken={accessToken} isActive={isActive} />

            <DeleteProductForm productId={productId} accessToken={accessToken} canDelete={canDelete} />

        </main>

    )


}