import { submitOrder } from "@/actions/submit-order-actions"
import { useStore } from "@/src/store-zustand"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify";


export default function SubmitOrderForm () {

    const total = useStore( (state) => state.total ) ;

    const couponName = useStore( (state) => state.coupon.cupon.name ) ;

    const contents = useStore( (state) => state.contents ) ;

    const clearOrder = useStore( (state) => state.clearOrder ) ;

    const orderFormatContents = contents.map( ( {price, ...item} ) => {
        return {
            ...item,
            priceAtTransactionDate: price
        }
    } )

    const orderFull = {
        total,
        cupon: couponName,
        contents: orderFormatContents
    }


    const submitOrderWithData = submitOrder.bind(null, orderFull) ; 
                                // bind le anula la posibilidad a la fn de pasarle argumentos cuando se la ejecuta, pero se los sobreescribe 

    const [ state, dispatch ] = useActionState( submitOrderWithData , {
        errors: [],
        success: ""
    } )

    console.log("\n", state) ;


    useEffect( () => {

        if( state.errors ) {
            state.errors.forEach( (error) => toast.error(error) )
        }


        if( state.success ) {
            toast.success( state.success )
            clearOrder() 
        } ;

    }, [state] )


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