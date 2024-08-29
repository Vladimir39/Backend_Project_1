import { CartDTO } from 'src/cart/dto/cart.dto'

export type Address = {
	email: string
	firstName: string
	lastName: string
	phone: string
	address: string
	comment?: string
}
export type OrderItemDTO = CartDTO & Address
