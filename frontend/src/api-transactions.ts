import { TransactionsResponseSchema } from "./schema";

export async function getSalesByDate(date: string) {

    const API_DIRECTION = `${process.env.API_URL}/transactions?transactionDate=${date}` as const ;

    const NEXT_DIRECTION = `${process.env.NEXT_PUBLIC_TRANSACTION_DOMAIN}${date}` as const ;


    const isServer = typeof window === "undefined" ;
    
    const url = isServer ? API_DIRECTION : NEXT_DIRECTION ;

    
    const req = await fetch(url) ;

    const response = await req.json() ;

    
    const transactions = TransactionsResponseSchema.parse( response )
    
    console.log(transactions)
    
    return transactions

}   