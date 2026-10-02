import { cartItemT } from "@/src/schema"
import { FormatCurrency } from "@/src/utils"
import Image from "next/image"
import { useStore } from "@/src/store-zustand/store-zustand"


type itemPropsT = {
    item : cartItemT
}

export default function ShoppingCartItem ( {item} : itemPropsT ) {

    const updateQuantity = useStore( (state) => state.updateQuantity ) ;

    const removeFromCart = useStore( (state) => state.removeFromCart ) ;

    const decreaseQuantity = () => {
        
        if( item.quantity <= 1 ) return ;
        
        updateQuantity( item.productId, item.quantity - 1 )
    }

    const increaseQuantity = () => {

        if( item.quantity >= item.inventory ) return ;

        updateQuantity( item.productId, item.quantity + 1 )

    }

    const handleOnRemoveItem = ( ) => {
        removeFromCart( item.productId )
    }


    return(
    
        <li className="flex items-center space-x-6 py-6 relative">

            <article className="h-24 w-24" >

                <Image 
                    src={item.image} 
                    alt={`Image for the Product: ${item.name}`}
                    width={100}
                    height={100}
                    priority
                />
            
            </article>

            <article className="flex-auto space-y-2" >

                <h3 className="text-gray-900" > {item.name} </h3>

                <p> { FormatCurrency(item.price) } </p>

                <div className="w-32 flex items-center justify-between rounded-lg bg-slate-200 p-1">

                    <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-md bg-white text-gray-700 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        -
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                        type="button"
                        onClick={increaseQuantity}
                        disabled={item.quantity >= item.inventory}
                        className="w-8 h-8 rounded-md bg-white text-gray-700 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        +
                    </button>

                </div>



            </article>

            <article className="absolute top-10 -right-0" >

                <button type="button" onClick={ handleOnRemoveItem } >

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>

            </article>

        </li>


    
    )
}