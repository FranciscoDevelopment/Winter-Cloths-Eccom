import { CategoriesResponseSchema, productT } from "@/src/schema";
import UploadProductImage from "./UploadProductImage";

type productFormPropsT = {
    product? : productT
}

async function getCategories () {

    const url = `${process.env.API_URL}/categories` ;

    const request = await fetch(url) ;

    const response = await request.json() ;

   const categories = CategoriesResponseSchema.parse(response) ;

   return categories

}

export default async function ProductForm( {product} : productFormPropsT ) {

    const categories = await getCategories() ;

    return (

        <section className="space-y-5">

            <article className="space-y-2 ">

                <label
                    htmlFor="name"
                    className="block text-stone-800 font-semibold"
                >
                    Name of Product
                </label>

                <input
                    id="name"
                    type="text"
                    placeholder="Nombre Producto"
                    className="border border-gray-300 w-full p-2"
                    name="name"
                    defaultValue={product?.name}
                />

            </article>

            <article className="space-y-2 ">

                <label
                    htmlFor="price"
                    className="block text-stone-800 font-semibold"
                >
                    Price
                </label>

                <input
                    id="price"
                    type="number"
                    placeholder="Precio Producto"
                    className="border border-gray-300 w-full p-2"
                    name="price"
                    min={0}
                    defaultValue={product?.price}
                />
            </article>

            <article className="space-y-2 ">

                <label
                    htmlFor="inventory"
                    className="block text-stone-800 font-semibold"
                >
                    Stock inventory
                </label>

                <input
                    id="inventory"
                    type="number"
                    placeholder="Cantidad Disponible"
                    className="border border-gray-300 w-full p-2"
                    name="inventory"
                    min={0}
                    defaultValue={product?.inventory}
                />
            </article>

            <article className="space-y-2 ">

                <label
                    htmlFor="categoryId"
                    className="block text-stone-800 font-semibold"
                >
                    Category
                </label>

                <select
                    id="categoryId"
                    className="border border-gray-300 w-full p-2 bg-white"
                    name="categoryId"
                    defaultValue={product?.categoryId}
                >
                <option value="">Select Category</option>
                
                {
                    categories.map( (category) => (
                        
                        <option key={category.id} value={category.id} >
                            {category.name}
                        </option>

                    ) )
                
                }
                </select>

            </article>

            <article className="space-y-2 ">

                <label
                    htmlFor="description"
                    className="block text-stone-800 font-semibold"
                >
                    Description (optional)
                </label>

                <textarea
                    id="description"
                    placeholder="Descripción del producto"
                    className="border border-gray-300 w-full p-2"
                    name="description"
                    rows={4}
                    maxLength={500}
                    defaultValue={product?.description ?? ""}
                />
            </article>

            <UploadProductImage
                currentImages={product?.images}
            />

        </section>
    )


}