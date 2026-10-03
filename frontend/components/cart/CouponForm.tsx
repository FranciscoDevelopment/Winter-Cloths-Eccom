"use client"

import { FormEvent } from "react"
import { useStore } from "@/src/store-zustand/store-zustand";
import { toast } from "react-toastify";

export default function CouponForm () {

    const applyCoupon = useStore( (state) => state.applyCoupon )

    const currentCoupon = useStore( (state) => state.coupon ) ;

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {

        e.preventDefault() ;

        const formData = new FormData( e.currentTarget )


        const couponName = formData.get( "coupon_name" )?.toString()

        if( !couponName ) return ;

        if( !couponName.length ) return ;

        
        try {
            await applyCoupon( couponName )
        } catch (error) {
            toast.error((error as string) + "\n Invalid Coupon!")
        }
        

    }

    return(

        <main>

            <p className="py-5 font-bold border-t border-gray-300" >Redeem Coupon</p>

            <form 
                className="flex"
                onSubmit={ handleSubmit }
            >

                <input 
                    type="text" 
                    className="p-2 bg-white border-gray-300 w-full"
                    placeholder="Ingresa un cupón"
                    name="coupon_name"
                />

                <input 
                    type="submit" 
                    className="p-3 bg-green-400 font-bold"
                    value="Canjear"
                />

            </form>

            { currentCoupon.message ? ( <p className="py-4 text-cyan-900 text-center text-sm font-extrabold" >{currentCoupon.message}</p> ) : null }

        </main>
    
    )
}