import TransactionFilter from "@/components/sales/TransactionFilter";
import Heading from "@/components/ui/Heading";

export default function MyOrderPage () {

    return (

        <main>

            <Heading>My Orders</Heading>

            <p className="text-lg">
                Here are your purchases, use the calendar to filter by date
            </p>

            <TransactionFilter/>

        </main>

    )

}