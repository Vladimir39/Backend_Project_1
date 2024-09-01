import { Address } from './dto/order.dto'
import { CartService } from './../cart/cart.service'
import { Request, Response } from 'express'
import {
	BadRequestException,
	Body,
	Controller,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { OrderService } from './order.service'

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
	) {
		const token = request.headers['authorization']
		console.log(dataOrder)
		const cart = await this.cartService.getCart(token)

		if (!cart) {
			throw new BadRequestException('Cart not found')
		}

		if (cart?.totalAmount === 0) {
			throw new BadRequestException('Cart is empty')
		}

		await this.orderService.createOrder(cart, dataOrder)
		await this.cartService.updateCartOrder(cart.token)

		const order = {
			count: 1,
			url: 'http://localhost:3000/'
		}

		return res.json(order)
		//return res.status(201).json('http://localhost:3000/')
	}
}
