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
				fullName: dataOrder.firstName + ' ' + dataOrder.lastName,
				email: dataOrder.email,
				phone: dataOrder.phone,
				address: dataOrder.address,
				comment: dataOrder.comment,
				totalAmount: cart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(cart.items)
			}
		})
	}
}
