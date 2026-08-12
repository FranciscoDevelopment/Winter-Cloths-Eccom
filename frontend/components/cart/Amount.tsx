
type amountPropsT = {
    label : string
    amount : string
    discount? : boolean
}

export default function Amount ( { label, amount, discount } : amountPropsT ) {

    return(
    
        <main className={`flex justify-between p-1 ${discount && 'bg-green-200 text-cyan-600'} `} >
            
            <dt className="font-bold" > {label} </dt>
            
            <dd className="text-gray-800" > {amount} </dd>
        
        </main>

    
    )
}