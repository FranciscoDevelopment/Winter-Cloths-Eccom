import { cartItemT } from "@/src/schema"
import { FormatCurrency } from "@/src/utils"
import Image from "next/image"

type itemPropsT = {
    item : cartItemT
}

export default function ShoppingCartItem ( {item} : itemPropsT ) {

    return(
    
        <li className="flex items-center space-x-6 py-6 relative">

            <article className="h-24 w-24" >

                <Image 
                    src={item.image} 
                    alt={`Image for the Product: ${item.name}`}
                    width={100}
                    height={100}   
                />
            
            </article>

            <article className="flex-auto space-y-2" >

                <h3 className="text-gray-900" > {item.name} </h3>

                <p> { FormatCurrency(item.price) } </p>

                <select 
                    className="w-32 text-center p-2 rounded-lg bg-white"
                    name={item.name} 
                    id={item.name}
                    value={ item.quantity }
                    onChange={ () => {} }
                >
                    { Array
                        .from({length: item.inventory}, (_ , index ) => index + 1 ).map( (num) => (
                        
                            
                        <option className="py-3" key={num} value={num} >
                            {num}
                        </option>

                    ) ) }
                </select>

            </article>

            <article className="absolute top-10 -right-0" >

                <button type="button" onClick={() => {}} >

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>

            </article>

        </li>


    
    )
}