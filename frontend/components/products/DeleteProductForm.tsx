import { productT } from "@/src/schema"
import { revalidatePath } from "next/cache"

type productDeleteFormPropsT = {
    productId : productT['id']
}

export default function DeleteProductForm ( {productId} : productDeleteFormPropsT ) {

    const handleDeleteProduct = async () => {
        "use server"

        const id = productId ;

        const url = `${process.env.API_URL}/products/${id}`

        const request = await fetch(url, {
            
            method: "DELETE",
        
        })

        await request.json() ;

        revalidatePath("admin/products")

    }


    return(
        
        <form action={handleDeleteProduct}>

            <input 
                type="submit" 
                className="text-red-600 hover:text-red-800 cursor-pointer"
                value="Delete"
                
            />

        </form>
    
    )
}