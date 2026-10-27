import { CategorySchema } from "@/src/schema";
import { notFound } from "next/navigation";


export async function getCategory ( id : string | number ) {

    const url = `${process.env.API_URL}/categories/${id}` ;

    const request = await fetch( url ) ;


    const response = await request.json()

    
    if( !request.ok ) notFound() ;
    
    
    return CategorySchema.parse(response)

}

