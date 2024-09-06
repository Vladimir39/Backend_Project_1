import { Module } from '@nestjs/common'
import { TelegramService } from './telegram.service'

import { PrismaService } from 'src/prisma.service'
import { OrderService } from 'src/order/order.service'
import { OrderController } from 'src/order/order.controller'
import { CartService } from 'src/cart/cart.service'

@Module({
	controllers: [OrderController],
	providers: [TelegramService, OrderService, CartService, PrismaService]
})
export class TelegramModule {}
