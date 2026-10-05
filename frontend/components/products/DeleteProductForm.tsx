import { deleteProduct } from "@/actions/delete-product-action"
import { productT } from "@/src/schema"
import { revalidatePath } from "next/cache"

type productDeleteFormPropsT = {
    productId : productT['id'],
    accessToken : string | null
}

export default function DeleteProductForm ( {productId, accessToken} : productDeleteFormPropsT  ) {

    const handleDeleteProduct = deleteProduct.bind( null, productId, accessToken )
    // (...restoDeArgumentos) => deleteProduct( productId, accessToken, ...restoDeArgumentos )


    return(
        
        <form action={handleDeleteProduct}>

            <input 
                type="submit" 
                className="text-red-700 hover:text-red-800 cursor-pointer my-2 p-2 bg-pink-50 text-md font-semibold"
                value="Delete"
                
            />

        </form>
    
    )
}