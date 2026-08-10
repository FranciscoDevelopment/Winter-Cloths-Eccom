
type amountPropsT = {
    label : string
    amount : string
}

export default function Amount ( { label, amount } : amountPropsT ) {

    return(
    
        <main className="flex justify-between " >
            
            <dt className="font-bold" > {label} </dt>
            
            <dd className="text-gray-800" > {amount} </dd>
        
        </main>

    
    )
}