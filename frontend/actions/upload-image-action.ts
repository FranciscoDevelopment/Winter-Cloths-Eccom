"use server"

export async function uploadImage ( formData : FormData, accessToken : string | null ) : Promise<string> {

    const url = `${process.env.API_URL}/products/upload-only-image`

    const request = await fetch( url, {

        method: "POST",

        headers: accessToken ? {Authorization: `Bearer ${accessToken}`} : undefined ,

        body: formData

    } ) ;


    if( !request.ok ) throw new Error("Can't upload the image")

    
    const image = await request.text() ;

    return image

}