import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'
import { OrderModule } from './order/order.module'
import { StoriesModule } from './stories/stories.module'
import { CartModule } from './cart/cart.module'
import { TelegramModule } from './telegram/telegram.module'
import { TelegrafModule } from 'nestjs-telegraf'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TelegrafModule,
		AuthModule,
		UserModule,
		ProductModule,
		CategoryModule,
		OrderModule,
		StoriesModule,
		CartModule,
		TelegramModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
