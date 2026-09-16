"use client"

//import { transactionT } from "@/src/schema"
import { FormatCurrency } from "@/src/utils"
import TransactionDetails from "./TransactionDetails"
import { useTransaction } from "./transaction-context-provider"

/*
type transactionSummaryPropsT = {
    transaction : transactionT
}
*/

export default function TransactionSummary ( ) {

    const transaction = useTransaction() ;

    const transactionDiscountCurrency = FormatCurrency( transaction.discount ) ;

    const transactionTotalCurrency = FormatCurrency( transaction.total ) ;
    
    
    //const totalOfTransaction = data?.reduce( (total, transaction) => total + transaction.total , 0 ) ?? 0 ;
    
    //const totalOfTransactionCurrency = FormatCurrency(totalOfTransaction) ;

    return(
    
        <section className='mb-6 bg-slate-300 text-sm font-medium text-teal-800 border border-gray-200'>
           
            <p className='text-sm font-black text-teal-800 p-2 bg-gray-500 '>ID: {transaction.id} </p>
            <ul
                role="list"
                className=" divide-y divide-slate-400 border-t border-gray-200 border-b"
            >
                <TransactionDetails />
            </ul>

            <dl className="space-y-6  text-sm font-medium text-slate-800 p-5">

                {transaction.cupon && (
                    <aside>
                        <article className="flex justify-between">
                            <dt>Used Coupon:</dt>
                            <dd className="text-emerald-900"> {transaction.cupon} </dd>
                        </article>

                        <article className="flex justify-between">
                            <dt>Discount:</dt>
                            <dd className="text-emerald-900">-{transactionDiscountCurrency}</dd>
                        </article>
                    </aside>
                )}


                <article className="flex justify-between">
                    <dt className="text-lg text-black font-black">Total</dt>
                    <dd className="text-lg text-black font-black">{transactionTotalCurrency}</dd>
                </article>
            </dl>


        </section>
        
    
    )
}