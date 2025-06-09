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
import { TelegramService } from 'src/telegram/telegram.service'

@Controller('orders')
export class OrderController {
	constructor(
		private readonly orderService: OrderService,
		private readonly cartService: CartService,
		private readonly telegramService: TelegramService
	) {}

	@Post()
	async createPost(
		@Req() request: Request,
		@Res() res: Response,
		@Body() dataOrder: Address
	) {
		const token = request.cookies['client_token1']
		const cart = await this.cartService.getCart(token)

		if (!cart) {
			throw new BadRequestException('Cart not found')
		}

		if (cart?.totalAmount === 0) {
			throw new BadRequestException('Cart is empty')
		}

		const orderBuy = await this.orderService.createOrder(cart, dataOrder)
		await this.cartService.updateCartOrder(cart.token)

		const order = {
			count: orderBuy.id,
			url: 'https://dimshashlik.ru/'
		}

		res.cookie('client_token1', '', {
			httpOnly: true,
			maxAge: 0,
			path: '/'
		})

		await this.telegramService.orderAdmin(orderBuy)

		return res.json(order)
	}
}
