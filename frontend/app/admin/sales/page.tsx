import TransactionFilter from "@/components/sales/TransactionFilter";
import Heading from "@/components/ui/Heading";
import { getSalesByDate } from "@/src/api-transactions";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { format } from "date-fns";

export default async function SalesPage () {

    const queryClient = new QueryClient() ;

    const todayDate = new Date() ;
    
    const formattedDate = format( todayDate, "yyyy-MM-dd") ;

    await queryClient.prefetchQuery({
        queryKey: ["sales", formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    return(
    
        <main>

            <Heading>Ventas</Heading>

            <p className="text-lg" >
                In this section are the sales, use the calendar for filter by date 
            </p>

            <HydrationBoundary state={ dehydrate(queryClient) } >
                <TransactionFilter/>
            </HydrationBoundary>


        </main>
    
    )
}