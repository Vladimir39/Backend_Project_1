import { Address } from './dto/order.dto'
import { CartService } from './../cart/cart.service'
import {
	BadRequestException,
	Body,
	Controller,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { OrderService } from './order.service'
import { Order as OrderModel } from '@prisma/client'

@Controller('orders')
export class OrderController {
	constructor(
		private readonly orderService: OrderService,
		private readonly cartService: CartService
	) {}

	@Post()
	async createPost(
		@Req() request: Request,
		@Res() res: Response,
		@Body() dataOrder: Address
	): Promise<OrderModel> {
		const token = request.headers['authorization']

		const cart = await this.cartService.getCart(token)

		if (!cart) {
			throw new BadRequestException('Cart not found')
		}

		if (cart?.totalAmount === 0) {
			throw new BadRequestException('Cart is empty')
		}

		const order = await this.orderService.createOrder(cart, dataOrder)

		const updateCart = await this.cartService.updateCartOrder(cart.token)

		return token
	}
}
