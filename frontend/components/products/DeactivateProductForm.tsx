import { deactivateProduct } from "@/actions/deactivate-product-action";
import { activateProduct } from "@/actions/activate-product-action";
import { productT } from "@/src/schema";

type deactivateProductFormPropsT = {

    productId : productT['id'];
    accessToken : string | null ,
    isActive : boolean

}

export default function DeactivateProductForm ( {productId, accessToken, isActive} : deactivateProductFormPropsT ) {

    const handleToggleProduct = isActive
        ? deactivateProduct.bind(null, productId, accessToken )
        : activateProduct.bind(null, productId, accessToken ) ;


    return(

        <form action={handleToggleProduct} >

            <input
                type="submit"
                className="rounded-xl text-amber-700 hover:text-amber-800 cursor-pointer p-2 bg-amber-50 text-md font-semibold"
                value={isActive ? "Disable" : "Enable"}
            />

        </form>

    )
}