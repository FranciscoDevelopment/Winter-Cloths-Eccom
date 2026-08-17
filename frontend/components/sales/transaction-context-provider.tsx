"use client"

import { createContext, useContext, ReactNode } from "react" ;
import { transactionT } from "@/src/schema";

type transactionContextT = {
    transaction : transactionT
}
type transactionContextFieldsPropsT = {
    transaction : transactionT ;
    children : ReactNode
}

const TransactionContext = createContext< transactionContextT | null > (null) ;


export function TransactionProvider ( {transaction, children} : transactionContextFieldsPropsT ) {

    return (
        <TransactionContext.Provider value={ {transaction} } >
            {children}
        </TransactionContext.Provider>
    )

}


export function useTransaction () {

    const context = useContext( TransactionContext ) ;

    if(!context) throw new Error( "useTransaction must be used inside a TransactionProvider" ) ;


    return context.transaction ;

}
