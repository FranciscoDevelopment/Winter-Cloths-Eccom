"use client"

import {useStore} from "@/src/store-zustand"
import ProductsInCartSection from "./ProductsInCartSection"

export default function ShoppingCart () {

    const contents = useStore( (state) => state.contents ) ;

    if(contents.length) return ( <main> <ProductsInCartSection /> </main> );
    
    else return( <main> <p className="text-xl text-center text-gray-900">The cart is empty</p> </main> ) ;    
    
}