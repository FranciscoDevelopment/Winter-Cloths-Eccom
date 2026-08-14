import TransactionFilter from "@/components/sales/TransactionFilter";
import Heading from "@/components/ui/Heading";

export default function SalesPage () {

    return(
    
        <main>

            <Heading>Ventas</Heading>

            <p className="text-lg" >
                In this section are the sales, use the calendar for filter by date 
            </p>

            <TransactionFilter/>

        </main>
    
    )
}