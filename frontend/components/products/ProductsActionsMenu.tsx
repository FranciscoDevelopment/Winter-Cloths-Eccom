"use client"

import Link from "next/link"
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


    return (


        <main className={`${inter.className} flex flex-col gap-4 justify-center items-start `}>

            <Link
                href={`/admin/products/${productId}/edit`}
                className="text-indigo-700 hover:text-indigo-800 rounded-xl p-2 mb-2 bg-green-50 text-lg font-semibold"
            >
                Edit <span className="sr-only">{productName}</span>
            </Link>

            <DeactivateProductForm productId={productId} accessToken={accessToken} isActive={isActive} />

            <DeleteProductForm productId={productId} accessToken={accessToken} canDelete={canDelete} />

        </main>

    )


}