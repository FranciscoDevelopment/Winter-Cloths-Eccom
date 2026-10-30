import { CategoriesResponseSchema } from "@/src/schema";
import Logo from "./ui/Logo";
import Link from "next/link";
//import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation"
import AuthNavButton from "./ui/AuthNavButton";
import CategoriesOverflowMenu from "./ui/CategoriesOverflowMenu";

const VISIBLE_CATEGORIES_COUNT = 5 as const ;

const getCategories = async () => {

    const url = `${process.env.API_URL}/categories`

    const response = await fetch(url) ;


    if( !response.ok ) redirect('/1') ;
    

    const data = await response.json() ;


    const categories = CategoriesResponseSchema.parse(data).map( (category) => {
        return {
            ...category,
            name: category.name
                                .split( " " )
                                .map( (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() )
                                .join( " " )
        }
    } ) ;


    return categories

}

export default async function MainNav () {

    const categories = await getCategories()

    const visibleCategories = categories.slice(0, VISIBLE_CATEGORIES_COUNT)

    const overflowCategories = categories.slice(VISIBLE_CATEGORIES_COUNT)

    return (

        <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between" >

            <section className="flex justify-center" >
                <Logo/>
            </section>

            <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0" >

                {visibleCategories.map( (category) => (

                    <Link key={category.id} href={ `/${category.id}` } className="text-slate-100 hover:text-green-400 font-bold p-2">
                        {category.name}
                    </Link>

                ) )}

                {overflowCategories.length > 0 && (
                    <CategoriesOverflowMenu categories={overflowCategories} />
                )}

                <AuthNavButton/>

            </nav>

        </header>

    )

}