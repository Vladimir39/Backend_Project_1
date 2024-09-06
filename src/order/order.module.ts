import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { PrismaService } from 'src/prisma.service'
import { CartService } from 'src/cart/cart.service'
import { TelegramService } from 'src/telegram/telegram.service'

@Module({
	controllers: [OrderController],
	providers: [OrderService, CartService, TelegramService, PrismaService]
})
export class OrderModule {}
