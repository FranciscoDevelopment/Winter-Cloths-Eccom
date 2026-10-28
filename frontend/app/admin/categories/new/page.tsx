import NewCategoryForm from "@/components/categories/NewCategoryForm";
import CategoryForm from "@/components/categories/CategoryForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NewCategoryPage () {

    return(

        <main>
        
            <Link
                href="/admin/products?page=1"
                className="rounded bg-lime-400 text-cyan-900 font-bold py-2 px-10"
            >
                <span className="font-extrabold text-lg text-cyan-900" >
                    &laquo;
                </span>
                Back to Products

            </Link>


            <Heading>
                Add new category
            </Heading>

            
            <NewCategoryForm>

                <CategoryForm/>
            
            </NewCategoryForm>

        </main>

    )

}