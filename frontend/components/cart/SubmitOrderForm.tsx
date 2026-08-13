import { submitOrder } from "@/actions/submit-order-actions"
import { useStore } from "@/src/store-zustand"
import { useActionState } from "react"



export default function SubmitOrderForm () {

    const total = useStore( (state) => state.total ) ;

    const couponName = useStore( (state) => state.coupon.cupon.name ) ;

    const contents = useStore( (state) => state.contents ) ;

    const orderFull = {
        total,
        coupon: couponName,
        contents
    }

    console.log(orderFull)

    const submitOrderWithData = submitOrder.bind(null, orderFull) ; 
                                // bind le anula la posibilidad a la fn de pasarle argumentos cuando se la ejecuta, pero se los sobreescribe 

    const [ state, dispatch ] = useActionState( submitOrderWithData , {
        errors: [],
        success: ""
    } )

    return(
    
        <form
            action={dispatch}

        >

            <input
                type="submit" 
                className="
                    mt-5 w-full bg-indigo-500 hover:bg-indigo-600 text-yellow-100 uppercase
                    font-bold p-3
                "
                value="Confirm purchase"
            />

        </form>
    
    )
}