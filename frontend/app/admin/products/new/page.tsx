import NewProductForm from "@/components/products/NewProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NewProductPage () {

    return(
    
        <main>

            <Link
                href='/admin/products?page=1'
                className="rounded bg-lime-400 text-cyan-900 font-bold py-2 px-10"
            >
                <span className="font-extrabold text-lg text-cyan-900" >&laquo;</span> Back to Products
            </Link>

            <Heading>
                Add new products logic
            </Heading>

            <NewProductForm>
                <ProductForm/>
            </NewProductForm>
        
        </main>
    
    )
}