import EditCategoryForm from "@/components/products/EditCategoryForm";
import CategoryForm from "@/components/categories/CategoryForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import { getCategory } from "@/actions/get-single-category-action";


type paramsT = Promise<{id: string}> ;


type editCategoryPagePropsT = {
    params : paramsT
}

export default async function EditCategoryPage ( {params} : editCategoryPagePropsT ) {

    const {id} = await params ;


    const category = await getCategory(id) ;


    return (
        <main>

            <Link
                href='/admin/categories'
                className="rounded bg-lime-400 text-cyan-900 font-bold py-2 px-10"
            >
                
                <span className="font-extrabold text-lg text-cyan-900" >&laquo;</span> Back to Categories
            
            </Link>


            <Heading>

                <span className="underline" >
                    Edit the Category:
                </span> 
                #{category.id} 
                <span className="font-bold" > 
                    {category.name}
                </span>

            </Heading>

            <EditCategoryForm>
                <CategoryForm category={category} />
            </EditCategoryForm>

        </main>
    )

}
