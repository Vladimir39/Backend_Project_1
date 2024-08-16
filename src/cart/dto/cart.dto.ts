import { CartItem, Ingredient, Product } from '@prisma/client'

export type CartItemDTO = CartItem & {
	product: Product
	ingredients: Ingredient[]
}

export type CartStateItem = {
	id: number
	quantity: number
	name: string
	imageUrl: string
	price: number
	ingredients: Array<{ name: string; price: number }>
}

export class CartDTO {
	items: CartStateItem[]
	totalAmount: number
	token?: string
}

export interface CreateCartItemValues {
	productId: number
	ingredient: number[]
}
