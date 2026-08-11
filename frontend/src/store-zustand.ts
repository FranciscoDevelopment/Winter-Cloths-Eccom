import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { productT, shoppingCartT } from "./schema"

type storeT = {
    
    total : number,

    contents: shoppingCartT ,

    addToCart : ( product : productT ) => void ,

    updateQuantity: ( id : productT['id'], quantity : number ) => void

    removeFromCart: ( id : productT['id'] ) => void

    calculateTotal: () => void

    applyCoupon: ( couponName : string ) => Promise<void>

}

export const useStore = create<storeT>()( devtools( ( set, get ) => {


    return {
        total: 0,
        contents: [] ,

        addToCart: ( product ) => {
            
            console.log( product )

            const { id: productId, categoryId, ...data } = product ;
            // const productId = product.id

            let contents : shoppingCartT = [] ;

            const duplicated = get().contents.findIndex( (item) => item.productId === productId )

            console.log(duplicated) ;

            if( duplicated >= 0 ) {

                if( get().contents[duplicated].quantity >= get().contents[duplicated].inventory ) return ;

                contents = get().contents.map( (item) => {
                    
                    return item.productId === productId
                                            ? {...item, quantity: item.quantity + 1  }
                                            : item

                } )
            } else {
                contents = [ ...get().contents , {
                    ...data,
                    quantity: 1 ,
                    productId
                } ]
            }

            set( () => ({
                contents
            }) )

            get().calculateTotal() ;

        },

        updateQuantity: ( id, quantity ) => {
            
            console.log( id );
            console.log(quantity)

            const contents = get().contents.map( (item) => {

                return item.productId === id
                                        ? {...item, quantity }
                                        : item

            } )

            set( () => ( {contents: contents } ) ) ;

            get().calculateTotal() ;

        }
        ,

        removeFromCart: (id) => {
            
            set( (state) => ({
                contents: state.contents.filter( (item) => item.productId !== id )
            }) )

            get().calculateTotal() ;

        }
        ,

        calculateTotal: () => {
            
            const currentTotal = get().contents.reduce( ( total, item ) => total + (item.quantity * item.price ), 0 ) ;

            set( () => ( {total: currentTotal } ) ) ;

        }
        ,
        applyCoupon: async ( couponName ) => {
            console.log(couponName)

            const response = await fetch( `/coupons/api`, {     // fetch interno en Next

                method: "POST",
                body: JSON.stringify({
                    cupon_name: couponName
                })

            } )

            const data = await response.json() ;

            console.log(data)

        }
    }

} ) )