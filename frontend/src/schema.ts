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


export const ShoppingCartSchema = z.array( ShoppingCartContentsSchema )

export type productT = z.infer< typeof ProductSchema >

export type shoppingCartT = z.infer<typeof ShoppingCartSchema>
