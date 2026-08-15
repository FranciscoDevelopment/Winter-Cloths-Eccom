import { TransactionsResponseSchema } from "./schema";

export async function getSalesByDate(date: string) {

    const url = `${process.env.NEXT_PUBLIC_TRANSACTION_DOMAIN}${date}`

    
    const req = await fetch(url) ;

    const response = await req.json() ;

    
    const transactions = TransactionsResponseSchema.parse( response )
    
    console.log(transactions)
    
    return transactions

}   