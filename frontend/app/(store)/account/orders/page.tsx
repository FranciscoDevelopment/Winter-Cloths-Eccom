import TransactionFilter from "@/components/sales/TransactionFilter";

export default function MyOrderPage () {

    return (

        <main>

            <h1 className="text-2xl mb-2">My Orders</h1> {/* 👈 antes era <Heading>, que trae my-10 (40px arriba y abajo); acá uso un h1 propio con mb-2 nomás */}


            <p className="text-lg">
                Here are your purchases, use the calendar to filter by date
            </p>

            <TransactionFilter/>

        </main>

    )

}