export async function POST ( request : Request ) {

    const coupon = await request.json() ;

    const url = `${process.env.API_URL}/cupons/apply-cupon`


    const response = await fetch( url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( coupon )
    } )

    
    const data = await response.json() ;

    console.log(data)


    return Response.json(
        {
            ...data,
            status: response.status
        }
    )

}