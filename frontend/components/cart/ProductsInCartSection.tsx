import { cartContentsT } from "@/src/types/CartContents.type"
import ShoppingCartItem from "./ShoppingCartItem"

type contentsPropsT = {
    contents : cartContentsT[]
}

export default function ProductsInCartSection ( {contents} : contentsPropsT ) {

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
        
        </section>
    
    )
}