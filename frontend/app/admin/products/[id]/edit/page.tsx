import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import { ProductSchema } from "@/src/schema";
import Link from "next/link";
import { notFound } from "next/navigation";

type paramsT = Promise< {id : string } >

type editProductPagePropsT = {
    params: paramsT
}

async function getProduct ( id : string | number ) {

    const url = `${process.env.API_URL}/products/${id}` ;

    // console.log(url)

    const request = await fetch( url ) ;

    const response = await request.json() ;

    if( !request.ok ) {
        notFound()
    }

    const product = ProductSchema.parse(response) ;

    return product

} 

export default async function EditProductPage ( {params} : editProductPagePropsT ) {

    const { id } = await params ;

    const product = await getProduct( id ) ;

    return(
    
        <main>

            <Link
                href='/admin/products?page=1'
                className="rounded bg-lime-400 text-cyan-900 font-bold py-2 px-10"
            >
                <span className="font-extrabold text-lg text-cyan-900" >&laquo;</span> Back to Products
            </Link>

            <Heading>
                Edit the Product: {product.name}
            </Heading>

            <EditProductForm>
                <ProductForm product={product} />
            </EditProductForm>


        </main>
    
    )
}