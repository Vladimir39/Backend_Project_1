import { Module } from '@nestjs/common'
import { AddressController } from './address.controller'
import { AddressService } from './address.service'
import { PrismaService } from 'src/prisma.service'
import { CartService } from 'src/cart/cart.service'

@Module({
	controllers: [AddressController],
	providers: [AddressService, CartService, PrismaService]
})
export class AddressModule {}
