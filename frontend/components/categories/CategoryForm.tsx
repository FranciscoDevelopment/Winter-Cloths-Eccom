import { categoryT } from "@/src/schema"

type categoryFormPropsT = {
    category? : categoryT
}


export default function CategoryForm ( {category} : categoryFormPropsT ) {

    return (

        <section className="space-y-5">

            <article className="space-y-2">
            
                <label htmlFor="name" className="block text-stone-800 font-semibold">
                    Name of Category
                </label>


                <input 
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name of Category"
                    className="border border-gray-300 w-full p-2"
                    defaultValue={category?.name}
                />

            </article>
        
        </section>

    )

}