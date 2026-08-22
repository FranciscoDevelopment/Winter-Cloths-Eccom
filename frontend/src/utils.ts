export function FormatCurrency ( amount : number ) {

    return new Intl.NumberFormat( "en-US", {style: "currency", currency: "USD"} ).format( amount )

}

export function isValidPage ( value : number ) {

    if( value === null ) return false ;

    if( typeof value !== "number" && isNaN(value) ) return false ;

    if( value <= 0 ) return false ;

    if( !Number.isInteger(value) ) return false ;

    return true

}

export function getImagePath ( imageUrl : string ) {

    const aws_s3Bucket = process.env.AWS_S3_BUCKET!;

    const s3BaseUrl = `https://${aws_s3Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com`

    if( imageUrl.startsWith( s3BaseUrl ) ) {
        return imageUrl
    }
    
}


export const isAvailableByStock = (inventory : number) => inventory > 0 ;