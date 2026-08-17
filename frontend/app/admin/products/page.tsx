import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { ProductsResponseSchema } from "@/src/schema";

async function getAllProducts () {

    const urlAPI = `${process.env.API_URL}/products/length` ;

    const req = await fetch(urlAPI) ;

    const response = await req.json()

    //console.log(data) ;

    const data = ProductsResponseSchema.parse(response) ;


    return {
        products: data.products ,
        total: data.total
    }
}

export default async function ProductsPage () {

    const { products, total } = await getAllProducts() ; 

    return(
    
        <section>
            
            <Heading>

                Admin products
            </Heading>
        
            <ProductsTable
                products={products}
            />

        </section>
    
    )
}