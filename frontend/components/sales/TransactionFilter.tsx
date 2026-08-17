"use client"

import { useState } from "react"
import Calendar from "react-calendar"
// @ts-ignore: no type declarations available for this CSS module
import "react-calendar/dist/Calendar.css"
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { getSalesByDate } from "@/src/api-transactions"
import TransactionSummary from "./TransactionSummary"


type valuePieceT = Date | null ;
type valueT = valuePieceT | [ valuePieceT, valuePieceT ] ;

export default function TransactionFilter () {

    const [ date, setDate ] = useState<valueT>( new Date() )

    const formattedDate = format( (date instanceof Date ? date : new Date()), "yyyy-MM-dd" ) ;


    const { data, isLoading } = useQuery({
        queryKey: ["sales", formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })


    //if(isLoading) return "Loading..." ;


    return (
    
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10" >

            <section>

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

                                <TransactionSummary
                                    key={transaction.id}
                                    transaction={transaction}
                                />

                            ) )
                            : <p className="text-lg text-center" >No sales for the date yet</p>
                    : null 
                }
                    
            </section>

        </main>
    
    )
}