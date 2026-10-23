import { deactivateProduct } from "@/actions/deactivate-product-action";
import { productT } from "@/src/schema";

type deactivateProductFormPropsT = {
    
    productId : productT['id'];
    accessToken : string | null

}

export default function DeactivateProductForm ( {productId, accessToken} : deactivateProductFormPropsT ) {

    const handleDeactivateProduct = deactivateProduct.bind(null, productId, accessToken ) ;


    return(
    
        <form action={handleDeactivateProduct} >

            <input 
                type="submit"
                className="rounded-xl text-amber-700 hover:text-amber-800 cursor-pointer my-2 p-2 bg-amber-50 text-md font-semibold"
                value="Disable"
            />

        </form>
    
    )
}