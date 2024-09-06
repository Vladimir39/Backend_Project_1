import { Injectable } from '@nestjs/common'
import { Order } from '@prisma/client'
import { Telegraf } from 'telegraf'

@Injectable()
export class TelegramService {
	private bot: Telegraf
	constructor() {
		const token = process.env.TELEGRAM_BOT_TOKEN
		this.bot = new Telegraf(token)
		// this.bot.launch()
	}

	async orderAdmin(orderBuy: Order) {
		const adminChatId = ['1144477936', '1144477936']
		await adminChatId.forEach(adminChatId => {
			this.bot.telegram.sendMessage(
				adminChatId,
				`Номер заказа - ${orderBuy.id}
				Данные по заказу:
				${orderBuy.address}
				
				  
				Номер телефона - ${orderBuy.phone}
				Доп. информация - ${orderBuy.comment}
				Время доставки - ${orderBuy.status}
				  
				Блюда:
				${orderBuy.items}
				Сумма по заказу : ${orderBuy.totalAmount}.00р.`
			)
		})
	}
}
