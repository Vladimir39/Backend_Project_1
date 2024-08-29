import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { PrismaService } from 'src/prisma.service'
import { CartService } from 'src/cart/cart.service'

@Module({
	controllers: [OrderController],
	providers: [OrderService, CartService, PrismaService]
})
export class OrderModule {}
