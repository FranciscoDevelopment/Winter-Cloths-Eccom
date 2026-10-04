"use client"

import { useState } from "react"

import "react-calendar/dist/Calendar.css"
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { getSalesByDate } from "@/src/api-transactions"
import TransactionSummary from "./TransactionSummary"
import { TransactionProvider } from "./transaction-context-provider"
import { FormatCurrency } from "@/src/utils"
import dynamic from "next/dynamic"
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand"


const Calendar = dynamic( () => import("react-calendar") , {
    ssr: false
} )

type valuePieceT = Date | null ;
type valueT = valuePieceT | [ valuePieceT, valuePieceT ] ;

export default function TransactionFilter () {

    const [ date, setDate ] = useState<valueT>( new Date() )

    const formattedDate = format( (date instanceof Date ? date : new Date()), "yyyy-MM-dd" ) ;


    const accessToken = useAuthStore( (state) => state.accessToken ) ;


    const { data, isLoading } = useQuery({
        queryKey: ["sales", formattedDate, accessToken],
        queryFn: () => getSalesByDate(formattedDate, accessToken),
        enabled: !!accessToken
    })


    const totalOfTransaction = data?.reduce( (total, transaction) => total + transaction.total , 0 ) ?? 0 ;

    const totalOfTransactionCurrency = FormatCurrency(totalOfTransaction) ;


    return (
    
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start" >

            <section className="lg:sticky lg:top-10" >

                <br />
                
                <Calendar
                    value={date}
                    onChange={setDate}
                />
            
            </section>

            <section>
                
                {isLoading && "Loading..."}

                { 
                    data ? 
                        data.length 
                            ? data.map( (transaction) => (

                                <TransactionProvider key={transaction.id} transaction={transaction} >
                                    <TransactionSummary />
                                </TransactionProvider>

                            ) )
                            : <p className="text-lg text-center" >No sales for the date yet</p>
                    : null 
                }
                <p className="my-5 text-lg font-bold text-right" > Total of day: 
                    <span> {totalOfTransactionCurrency}</span>
                </p>
                    
            </section>

        </main>
    
    )
}