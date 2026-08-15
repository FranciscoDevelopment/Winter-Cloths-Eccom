"use client"

import { useState } from "react"
import Calendar from "react-calendar"
// @ts-ignore: no type declarations available for this CSS module
import "react-calendar/dist/Calendar.css"
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { getSalesByDate } from "@/src/api-transactions"


type valuePieceT = Date | null ;
type valueT = valuePieceT | [ valuePieceT, valuePieceT ] ;

export default function TransactionFilter () {

    const [ date, setDate ] = useState<valueT>( new Date() )

    const formattedDate = format( date?.toString() || new Date() , "yyyy-MM-dd") ;


    const { data, isLoading } = useQuery({
        queryKey: ["sales", formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    console.log(data) ;
    console.log(isLoading)

    return(
    
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10" >

            <section>

                <br />
                
                <Calendar
                    value={date}
                    onChange={setDate}
                />
            
            </section>

        </main>
    
    )
}