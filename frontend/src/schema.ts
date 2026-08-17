import { z } from "zod"

export const ProductSchema = z.object(
    {
        id: z.number(),
        name: z.string(),
        image: z.string(),
        price: z.coerce.number(),
        inventory: z.number(),
        categoryId: z.number()
    }
)

export const CategorySchema = z.object(
    {
        id: z.number(),
        name: z.string()
    }
)

export const CategoryWithProductsResponseSchema = CategorySchema.extend(
    {
        products: z.array( ProductSchema )
    }
)

export const CategoriesResponseSchema = z.array( CategorySchema )


const ShoppingCartContentsSchema = ProductSchema.pick(
    {
        name: true,
        image: true,
        price: true,
        inventory: true,

    }
).extend(
    {
        productId: z.number(),
        quantity: z.number()
    }
)

export const CouponResponseSchema = z.object({

    message: z.string() ,

    cupon: z.object({
        name: z.string().default(""),
        porcentage: z.coerce.number().min(0).max(100).default(0)
    })

})

const OrderContentSchema = z.object({

    productId: z.number() ,
    quantity: z.number() ,
    priceAtTransactionDate: z.number()

})

export const OrderSchema = z.object({

    total: z.number() ,
    cupon: z.string().optional(),
    //coupon: z.string().optional() ,
    contents: z.array( OrderContentSchema ).min( 1, {message: "The cart can not be empty"} ) 

})


export const SuccessResponseSchema = z.object({
    message: z.string()
})

export const ErrorResponseSchema = z.object({
    message: z.array( z.string() ),
    error: z.string() ,
    statusCode: z.number()
})

export const ContentsSchemas = z.object({
    id: z.number(),
    quantity: z.number() ,
    priceAtTransactionDate: z.string(),
    product: ProductSchema
})

export const TransactionResponseSchema = z.object({
    id: z.number(),
    total: z.string(),
    transactionDate: z.string(),
    discount: z.string(),
    cupon: z.string().nullable().optional() ,
    contents: z.array( ContentsSchemas ) ,
})

export const TransactionsResponseSchema = z.array( TransactionResponseSchema ) ;

export const ShoppingCartSchema = z.array( ShoppingCartContentsSchema )

export type productT = z.infer< typeof ProductSchema >

export type shoppingCartT = z.infer<typeof ShoppingCartSchema>

export type cartItemT = z.infer< typeof ShoppingCartContentsSchema >

export type couponT = z.infer<typeof CouponResponseSchema> ;

export type transactionT = z.infer< typeof TransactionResponseSchema > ;
