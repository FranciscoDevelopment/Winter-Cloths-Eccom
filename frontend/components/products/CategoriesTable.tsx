import { categoryT } from "@/src/schema";
import Link from "next/link";


type categoriesTablePropsT = {
    categories : categoryT[]
}


export default function CategoriesTable ( {categories} : categoriesTablePropsT ) {

    return (

        <main className="px-4 sm:px-6 lg:px-8 mt-10" >

            <section className="mt-8 flow-root" >

                <article className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

                    <aside className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5">

                        <table className="min-w-full divide-y divide-gray-300">

                            <thead>

                                <tr>

                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-md font-semibold text-gray-900 sm:pl-0" >
                                        Name
                                    </th>

                                    <th scope="col" className="relative w-px whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
                                       <span className="sr-only">Actions</span>
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200" >

                                {categories.map( (category) => (

                                    <tr key={category.id} >

                                        <td className="py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-0" >
                                            {category.name}
                                        </td>


                                        <td className="relative w-px whitespace-nowrap py-4 pl-3 pr-4 text-right text-md font-medium sm:pr-0 bg-amber-100" >

                                            <menu className="flex p-1 justify-end items-center" >
                                                
                                                <Link
                                                    href={`/admin/categories/${category.id}/edit`}
                                                    className="text-indigo-700 hover:text-indigo-800 rounded-xl p-2 my-2 bg-green-50 text-lg font-semibold"
                                                >
                                                    Edit <span className="sr-only" >{category.name}</span>
                                                </Link>

                                            </menu>

                                        </td>


                                    </tr>

                                ) )  }

                            </tbody>


                        </table>

                    </aside>

                </article>

            </section>

        </main>

    )


}