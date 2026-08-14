import { CategoryWithProductsResponseSchema } from "@/src/schema";
import ProductCard from "@/components/products/ProductCard";

type paramsT = Promise< {categoryId : string} > ;

type paramsPropT = {
    params: paramsT
}


async function getProducts ( categoryId : string ) {

    const url = `${process.env.API_URL}/categories/${categoryId}?products=true` ;

    console.log( url )

    const response = await fetch( url, {
        
        next: {
            tags: ["products-by-category"]
        }
    
    } ) ;

    const data = await response.json() ;

    const products = CategoryWithProductsResponseSchema.parse( data ) ;
    

    return products ;

}


export default async function StorePage ( {params} : paramsPropT ) {

    const { categoryId } = await params ;


    const data = await getProducts( categoryId )

    const products = await data.products

    console.log(products)

    return(
    
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3" >
            
            {products.map( (product) => (

                <ProductCard
                    key={product.id}
                    product={ product }

                />

            ) )  }

        </div>
    
    )
}
