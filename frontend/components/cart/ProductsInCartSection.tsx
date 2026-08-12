"use client"

import { cartContentsT } from "@/src/types/CartContents.type"
import ShoppingCartItem from "./ShoppingCartItem"
import Amount from "./Amount"
import { useStore } from "@/src/store-zustand"
import { FormatCurrency } from "@/src/utils"
import CouponForm from "./CouponForm"



export default function ProductsInCartSection () {

    const contents = useStore( (state) => state.contents )

    const total = useStore( (state) => state.total )

    const totalCurrency = FormatCurrency(total)

    const discount = useStore( (state) => state.discount ) ;

    const discountCurrency = FormatCurrency( discount ) ;


    return(
    
        <section>
            <h2 className="text-4xl font-bold text-grey-900">
                Resumen de Venta
            </h2>

            <ul role="list" className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500" >

                {contents.map( (item) => (

                    <ShoppingCartItem
                        key={item.productId}
                        item={ item }
                    />

                ) ) }

            </ul>

            <dl className="space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-slate-700" >
                
                {discount 
                    ? (<Amount label="Discount" amount={"- "+discountCurrency} discount={true} />) 
                    :  null
                }

                <Amount label="Total" amount={totalCurrency} />
            </dl>


            <CouponForm/>
        
        </section>
    
    )
}