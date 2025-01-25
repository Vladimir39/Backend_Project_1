import { Injectable } from '@nestjs/common'
import { CartDTO } from 'src/cart/dto/cart.dto'
import { PrismaService } from 'src/prisma.service'
import { Address } from './dto/order.dto'
import { OrderStatus } from '@prisma/client'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async createOrder(cart: CartDTO, dataOrder: Address) {
		return await this.prisma.order.create({
			data: {
				token: cart.token,
				fullName: dataOrder.firstName,
				//email: dataOrder.email,
				phone: dataOrder.phone,
				delivery: dataOrder.delivery,
				address: dataOrder.address,
				code: dataOrder.code,
				flat: dataOrder.flat,
				entrance: dataOrder.entrance,
				floor: dataOrder.floor,
				comment: dataOrder.comment,
				totalAmount: cart.totalAmount,
				timeDelivery: dataOrder.time,
				status: OrderStatus.PENDING,
				items: JSON.stringify(cart.items)
			}
		})
	}
}
