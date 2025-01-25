import { CartItemDTO } from '../dto/cart.dto'

export const calcCartItemTotalPrice = (item: CartItemDTO) => {
	const ingredientPrice = item.ingredients.reduce(
		(acc, ingredient) => acc + ingredient.price,
		0
	)
	return ingredientPrice + item.product.price * item.quantity
}
