import { TransactionsResponseSchema } from "./schema";

export async function getSalesByDate(date: string, accessToken? : string | null ) {

    const API_DIRECTION = `${process.env.API_URL}/transactions?transactionDate=${date}` as const ;

    //const NEXT_DIRECTION = `${process.env.NEXT_PUBLIC_TRANSACTION_DOMAIN}${date}` as const ;

    const NEXT_FOLDING_DIRECTION= `/api/transactions?transactionDate=${date}`

    const isServer = typeof window === "undefined" ;
    
    

    const url = isServer ? API_DIRECTION : NEXT_FOLDING_DIRECTION ;

    
    const req = await fetch(url, {

        headers: accessToken ? {Authorization: `Bearer ${accessToken}`} : undefined ,
        cache: "no-store"

    }) ;

    const response = await req.json() ;

    
    const transactions = TransactionsResponseSchema.parse( response )

    
    return transactions

}   