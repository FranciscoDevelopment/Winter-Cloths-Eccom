import { FormEvent } from "react"

export default function CouponForm () {

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {

        e.preventDefault() ;

        const formData = new FormData( e.currentTarget )

        console.log( formData.get( "coupon_name" ) )

        const couponName = formData.get( "coupon_name" )

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

        </main>
    
    )
}