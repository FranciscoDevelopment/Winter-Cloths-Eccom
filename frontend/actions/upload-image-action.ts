"use server"

export async function uploadImage ( formData : FormData ) : Promise<string> {

    const url = `${process.env.API_URL}/products/upload-only-image`

    const request = await fetch( url, {

        method: "POST",

        body: formData

    } ) ;

    
    const image = await request.text() ;

    return image

}