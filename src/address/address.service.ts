import { Injectable } from '@nestjs/common'
import { AddressDto } from './dto/address.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AddressService {
	constructor(private prisma: PrismaService) {}

	async getAddress(token: string) {
		const addressId = await this.prisma.cart.findFirst({
			where: {
				token
			},
			include: {
				address: {
					select: {
						id: true
					},
					take: 1
				}
			}
		})

		return addressId?.address?.[0]?.id ?? null
	}

	async addressId(id: number) {
		return this.prisma.address.findFirst({
			where: {
				id
			}
		})
	}

	async createAddressCart(addressDto: AddressDto, cartId: number) {
		return this.prisma.address.create({
			data: {
				type: addressDto.delivery,
				addressHome: addressDto.address,
				house: addressDto.house,
				flat: addressDto.flat,
				entrance: addressDto.entrance,
				floor: addressDto.floor,
				cartId: cartId
			}
		})
	}

	async updateAddressCart(addressDto: AddressDto, cartId: number) {
		const address = await this.prisma.address.findFirst({
			where: {
				cartId
			}
		})

		return this.prisma.address.update({
			where: {
				id: address.id
			},
			data: {
				type: addressDto.delivery,
				addressHome: addressDto.address,
				house: addressDto.house,
				flat: addressDto.flat,
				entrance: addressDto.entrance,
				floor: addressDto.floor
			}
		})
	}
}
