import { transactionT } from "@/src/schema"

type transactionSummaryPropsT = {
    transaction : transactionT
}

export default function TransactionSummary ( {transaction} : transactionSummaryPropsT ) {


    return(
    
        <section className='mt-6  text-sm font-medium text-gray-500 border border-gray-200'>
           
            <p className='text-sm font-black text-gray-900 p-2 bg-gray-200 '>ID: {transaction.id} </p>
            <ul
                role="list"
                className="divide-y divide-gray-500 border-t border-gray-200 border-b"
            >
            {transaction.contents.map((item) => (
                <li className="p-5 ">
                    <article className='flex items-center space-x-6 '>

                        <div className='relative w-32 h-32'>

                        </div>

                        <div className="flex-auto space-y-1 ">
                            <h3 className="text-gray-900">
                                {item.product.name}
                            </h3>
                            <p className="text-lg font-extrabold  text-gray-900">{item.priceAtTransactionDate}</p>
                            <p className="text-lg  text-gray-900">Quantity: {item.quantity}</p>
                        </div>
                    
                    </article>
                </li>
            ))}
            </ul>

            <dl className="space-y-6  text-sm font-medium text-gray-500 p-5">

                <article className="flex justify-between">
                    <dt>Used Coupon</dt>
                    <dd className="text-gray-900"></dd>
                </article>

                <article className="flex justify-between">
                    <dt>Discount</dt>
                    <dd className="text-gray-900">-</dd>
                </article>

                <article className="flex justify-between">
                    <dt className="text-lg text-black font-black">Total</dt>
                    <dd className="text-lg text-black font-black"></dd>
                </article>
            </dl>


        </section>
        
    
    )
}