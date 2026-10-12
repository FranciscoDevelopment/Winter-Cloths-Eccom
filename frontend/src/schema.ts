import { z } from "zod"

export const ProductSchema = z.object(
    {
        id: z.number(),
        name: z.string(),
        images: z.array( z.string() ).max(3),
        description: z.string().nullable().optional(),
        price: z.coerce.number(),
        inventory: z.number(),
        categoryId: z.number()
    }
)

export const ProductsResponseSchema = z.object({

    products: z.array( ProductSchema ) ,

    total: z.number()
})


export const ProductFormSchema = z.object({
    name: z.string().min(1, {message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.coerce.number({message: 'Precio no válido'}).min(1, {message: 'El Precio debe ser mayor a 0'}),
    inventory: z.coerce.number({message: 'Inventario no válido'}).min(1, {message: 'El inventario debe ser mayor a 0'}),
    categoryId: z.coerce.number({message: 'La Categoria no es válida'}),
    images: z.array( z.string() ).min(1, {message: 'Subí al menos una imagen'}).max(3, {message: 'Como máximo 3 imágenes'}),
    description: z.string().max(500, {message: 'La descripción es muy larga'}).optional()
})

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
        price: true,
        inventory: true,

    }
).extend(
    {
        image: z.string(),
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
    contents: z.array( OrderContentSchema ).min( 1, {message: "The cart can not be empty"} ) 

})


export const SuccessResponseSchema = z.object({
    message: z.string()
})

/*
export const ErrorResponseSchema = z.object({
    message: z.array( z.string() ),
    error: z.string() ,
    statusCode: z.number()
})
*/

// schema.ts
export const ErrorResponseSchema = z.object({
    statusCode: z.number(),
    path: z.string(),
    timestamp: z.string(),
    message: z.object({
        statusCode: z.number(),
        message: z.union([ z.string(), z.array(z.string()) ]),
        error: z.string()
    })
})


export const ContentsSchemas = z.object({
    id: z.number(),
    quantity: z.number() ,
    priceAtTransactionDate: z.string(),
    product: ProductSchema
})

export const TransactionResponseSchema = z.object({
    id: z.number(),
    total: z.coerce.number(),
    transactionDate: z.string(),
    discount: z.coerce.number(),
    cupon: z.string().nullable().optional() ,
    contents: z.array( ContentsSchemas ) ,
})


export const CategoryFormSchema = z.object({
    name: z.string().min(1, {message: 'El Nombre de la Categoría no puede ir vacío'})
})



export const TransactionsResponseSchema = z.array( TransactionResponseSchema ) ;

export const ShoppingCartSchema = z.array( ShoppingCartContentsSchema )

export type productT = z.infer< typeof ProductSchema >

export type shoppingCartT = z.infer<typeof ShoppingCartSchema>

export type cartItemT = z.infer< typeof ShoppingCartContentsSchema >

export type couponT = z.infer<typeof CouponResponseSchema> ;

export type transactionT = z.infer< typeof TransactionResponseSchema > ;
