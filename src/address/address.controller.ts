import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { AddressService } from './address.service'
import { Response, Request } from 'express'
import { AddressDto } from './dto/address.dto'
import { randomUUID } from 'crypto'
import { CartService } from 'src/cart/cart.service'

@Controller('address')
export class AddressController {
	constructor(
		private readonly addressService: AddressService,
		private readonly cartService: CartService
	) {}

	@Get()
	async getAddress(@Req() request: Request, @Res() response: Response) {
		const token = request.cookies['client_token1']

		if (!token) {
			throw new BadRequestException('Не удалось получить корзину')
		}
		const addressId = await this.addressService.getAddress(token)

		if (addressId) {
			const address = await this.addressService.addressId(addressId)
			return response.status(200).json({
				message: 'Адрес',
				token,
				data: address,
				url: 'https://dimshashlik.ru/'
			})
		}
		return 0
	}
	@Post()
	async createPost(
		@Body() addressDto: AddressDto,
		@Req() request: Request,
		@Res() response: Response
	) {
		let token = request.cookies['client_token1']

		if (!token) {
			token = randomUUID()

			console.log(addressDto)
			console.log(token)

			response.cookie('client_token1', token, {
				maxAge: 24 * 60 * 60 * 1000, // 24 часа
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				path: '/'
			})

			const cart = await this.cartService.findOrCreateCart(token)
			const address = await this.addressService.createAddressCart(
				addressDto,
				cart.id
			)
			return response.status(200).json({
				message: 'Адрес',
				token,
				data: address,
				url: 'https://dimshashlik.ru/'
			})
		} else {
			console.log(addressDto)
			console.log(token)
			const cart = await this.cartService.findOrCreateCart(token)
			const updatedAdderss = await this.addressService.updateAddressCart(
				addressDto,
				cart.id
			)
			return response.status(200).json({
				message: 'Адрес',
				token,
				data: updatedAdderss,
				url: 'https://dimshashlik.ru/'
			})
		}
	}
}
