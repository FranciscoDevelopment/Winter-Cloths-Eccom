import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { ProductsResponseSchema } from "@/src/schema";
import { isValidPage } from "@/src/utils";
import { redirect } from "next/navigation";

type paginationT = Promise< {page : string} >

type searchParamsT = {
    searchParams : paginationT
}


async function getAllProducts ( take : number, skip : number ) {

    const urlAPI = `${process.env.API_URL}/products/length?take=${take}&skip=${skip}` ;

    const req = await fetch(urlAPI) ;

    const response = await req.json()

    //console.log(data) ;

    const data = ProductsResponseSchema.parse(response) ;


    return {
        products: data.products ,
        total: data.total
    }
}



export default async function ProductsPage ( {searchParams} : searchParamsT ) {

    const {page} = await searchParams ;

    console.log(page)

    if( !isValidPage( +page ) ) redirect( "/admin/products?page=1" )  ; 

    
    const PRODUCTS_PER_PAGE = 2 as const ;
    
    const skip = ( +page - 1 ) * PRODUCTS_PER_PAGE ;
    
    const { products, total } = await getAllProducts( PRODUCTS_PER_PAGE, skip ) ; 


    const totalPages = Math.ceil( total / PRODUCTS_PER_PAGE )

    console.log(totalPages) ;

    if( +page > totalPages ) redirect( "/admin/products?page=1" )  ;


    return(
    
        <section>
            
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