import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { CartService } from './cart.service'
import { Request, Response } from 'express'
import { CartDTO, CartStateItem, CreateCartItemValues } from './dto/cart.dto'
import { randomUUID } from 'crypto'

@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get()
	async getCart(@Req() request: Request) {
		//const token = request.headers['authorization']
		const token = request.cookies['client_token1']
		if (!token) {
			throw new BadRequestException('Не удалось получить корзину')
		}
		return this.cartService.getCart(token)
	}

	@Post()
	async postCart(
		@Req() request: Request,
		@Res() res: Response
	): Promise<Response<CartDTO>> {
		//let token = request.headers['authorization']
		const token = request.cookies['client_token1']
		// if (!token) {
		// 	token = randomUUID()
		// }

		const userCart = await this.cartService.findOrCreateCart(token)

		const data = (await request.body) as CreateCartItemValues

		const findCartItem = await this.cartService.findCartItem(userCart.id, data)

		if (findCartItem) {
			await this.cartService.updateCartItemQuantity(
				findCartItem.id,
				findCartItem.quantity
			)
		} else {
			await this.cartService.createCartItem(userCart.id, data)
		}

		const updatedUserCart = await this.cartService.updateCartTotalAmount(token)

		//res.cookie('cartToken', token)
		return res.json(updatedUserCart)
	}

	@Patch(':cartId')
	async patchCart(
		@Req() request: Request,
		@Param('cartId') cartId: string,
		@Body() cartStateItem: CartStateItem
	) {
		//const token = request.headers['authorization']
		const token = request.cookies['client_token1']
		const data = (await cartStateItem) as { quantity: number }
		const id = Number(cartId)

		if (!token) {
			throw new BadRequestException('Нет Токена')
		}
		return this.cartService.patchCart(token, id, data.quantity)
	}

	@Delete(':cartId')
	async deleteCart(
		@Req() request: Request,
		@Param('cartId') cartId: string,
		@Body() cartStateItem: CartStateItem
	) {
		//const token = request.headers['authorization']
		const token = request.cookies['client_token1']
		const id = Number(cartId)
		const data = (await cartStateItem) as { quantity: number }

		if (!token) {
			throw new BadRequestException('Нет Токена')
		}
		return this.cartService.deleteCart(token, id, data.quantity)
	}
}
