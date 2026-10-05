import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { ProductsResponseSchema } from "@/src/schema";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

type paginationT = Promise< {page : string} >

type searchParamsT = {
    searchParams : paginationT
}


async function getAllProducts ( take : number, skip : number ) {

    const urlAPI = `${process.env.API_URL}/products/length?take=${take}&skip=${skip}` ;

    const req = await fetch(urlAPI) ;

    const response = await req.json()

    const data = ProductsResponseSchema.parse(response) ;


    return {
        products: data.products ,
        total: data.total
    }
}



export default async function ProductsPage ( {searchParams} : searchParamsT ) {

    const {page} = await searchParams ;

    if( !isValidPage( +page ) ) redirect( "/admin/products?page=1" )  ; 

    
    const PRODUCTS_PER_PAGE = 5 as const ;
    
    const skip = ( +page - 1 ) * PRODUCTS_PER_PAGE ;
    
    const { products, total } = await getAllProducts( PRODUCTS_PER_PAGE, skip ) ; 


    const totalPages = Math.ceil( total / PRODUCTS_PER_PAGE )


    if( +page > totalPages ) redirect( "/admin/products?page=1" )  ;


    return(
    
        <section>
            
            <Link
                href='/admin/products/new'
                className="rounded bg-lime-400 font-bold py-2 px-10 text-cyan-900"
            >
                New Product
            </Link>

            <Heading>
                Admin products
            </Heading>
        
            <ProductsTable
                products={products}
            />

            <Pagination
                currentPage={+page}
                totalPages={totalPages}
                baseUrl="/admin/products"
            />

        </section>
    
    )
}