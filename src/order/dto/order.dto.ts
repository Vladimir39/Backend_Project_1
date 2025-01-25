import { CartDTO } from 'src/cart/dto/cart.dto'

export type Address = {
	//email: string
	firstName: string
	//lastName: string
	phone: string
	delivery: string
	address: string
	code: string
	flat: string
	entrance: string
	floor: string
	time: string
	comment?: string
}
export type OrderItemDTO = CartDTO & Address
