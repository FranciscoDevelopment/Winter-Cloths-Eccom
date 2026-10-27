import { CategoriesResponseSchema } from "@/src/schema";


export async function getAllCategories () {

    const url = `${process.env.API_URL}/categories` ;

    const request = await fetch( url ) ;

    
    const response = await request.json()


    return CategoriesResponseSchema.parse(response) ;

}