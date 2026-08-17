"use cliet"

import { FormatCurrency } from "@/src/utils"
import Image from "next/image"
import { useTransaction } from "./transaction-context-provider"

export default function TransactionDetails () {

    const transaction = useTransaction()

    return transaction.contents.map((item) => {

        const priceAtTransactionDate_Currency = FormatCurrency( +item.priceAtTransactionDate ) 

            return(
                <li className="p-5" key={item.id} >
                    <article className='flex items-center space-x-6 '>

                        <div className='relative w-32 h-32'>
                            <Image
                                src={item.product.image}
                                alt={`Image for the product ${item.product.name}`}
                                className="absolute"
                                fill
                            />
                        </div>

                        <div className="flex-auto space-y-1 ">
                            <h3 className="text-gray-900">
                                {item.product.name}
                            </h3>
                            <p className="text-lg font-extrabold  text-gray-900">{priceAtTransactionDate_Currency}</p>
                            <p className="text-lg  text-gray-900">Quantity: {item.quantity}</p>
                        </div>
                    
                    </article>
                </li>
            )
    })
}
