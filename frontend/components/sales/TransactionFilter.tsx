"use client"

import { useState } from "react"
import Calendar from "react-calendar"
// @ts-ignore: no type declarations available for this CSS module
import "react-calendar/dist/Calendar.css"
import { format } from "date-fns"


type valuePieceT = Date | null ;
type valueT = valuePieceT | [ valuePieceT, valuePieceT ] ;

export default function TransactionFilter () {

    const [ date, setDate ] = useState<valueT>( new Date() )

    const formattedDate = format( date?.toString() || new Date() , "yyyy-MM-dd") ;

    console.log(date) ;

    return(
    
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10" >

            <section>

                <br />
                
                <Calendar
                    value={date}
                />
            
            </section>

        </main>
    
    )
}