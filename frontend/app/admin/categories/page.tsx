import Heading from "@/components/ui/Heading";
import Link from "next/link";
import CategoriesTable from "@/components/products/CategoriesTable";
import { getAllCategories } from "@/actions/get-categories-action";


export default async function CategoriesPage() {

    const categories = await getAllCategories() ;


    return (

        <main>

            <Link
                href='/admin/products?page=1'
                className="rounded bg-lime-400 text-cyan-900 font-bold py-2 px-10"
            >
                <span className="font-extrabold text-lg text-cyan-900" >&laquo;</span> Back to Products
            </Link>

            <Heading>
                Categories
            </Heading>


            <CategoriesTable categories={categories} />

        </main>

    )

}