import { CategoryWithProductsResponseSchema } from "@/app/src/schema";
import ProductCard from "@/components/products/ProductCard";

type paramsT = Promise< {categoryId : string} > ;

type paramsPropT = {
    params: paramsT
}


async function getProducts ( categoryId : string ) {

    const url = `${process.env.API_URL}/categories/${categoryId}?products=true` ;

    console.log( url )

    const response = await fetch( url ) ;

    const data = await response.json() ;

    const products = CategoryWithProductsResponseSchema.parse( data ) ;
    

    return products ;

}


export default async function StorePage ( {params} : paramsPropT ) {

    const { categoryId } = await params ;


    const category = await getProducts( categoryId )

    console.log(category)

    return(
    
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3" >
            
            {category.products.map( (product) => (

                <ProductCard
                    key={product.id}

                />

            ) )  }

        </div>
    
    )
}
