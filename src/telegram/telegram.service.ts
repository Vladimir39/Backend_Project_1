import { Injectable } from '@nestjs/common'
import { Order } from '@prisma/client'
import { Telegraf } from 'telegraf'

@Injectable()
export class TelegramService {
	private bot: Telegraf
	constructor() {
		const token = process.env.TELEGRAM_BOT_TOKEN
		this.bot = new Telegraf(token)
	}

	async orderAdmin(orderBuy: Order) {
		const adminChatId = ['1144477936']
		const items = JSON.parse(orderBuy.items as string)

		console.log(items)

		const order = items.map(
			obj =>
				`*${obj.category.toUpperCase()} - ${obj.name}
		Дополнительно к блюду:\n${obj.ingredients.map(item => item.name).join(';\n')}
		Всего *${obj.quantity}* ед. - стоимость *${obj.price}р.* за ед.\n
		********************************* \n`
		)
		await adminChatId.forEach(adminChatId => {
			this.bot.telegram.sendMessage(
				adminChatId,
				`*Номер заказа:* ${orderBuy.id}
				
				*Тип: ${orderBuy.delivery.toUpperCase()}*
				*Адрес:* 
				Улица: ---	${orderBuy.address.toUpperCase()}
				Квартира: ---	${orderBuy.flat}
				Подъезд: ---	${orderBuy.entrance}
				Код двери: ---	${orderBuy.code}
				Этаж: --- ${orderBuy.floor}
				Время доставки: --- ${orderBuy.timeDelivery}
				Доп. информация: --- ${orderBuy.comment}

				*--ДАННЫЕ ПО КЛИЕНТУ--*
				Имя: --------------- ${orderBuy.fullName}
				Номер телефона: ---- ${orderBuy.phone}
				
				*Блюда:*
				${order}
				*Сумма по заказу:* *${orderBuy.totalAmount}.00р.*`
			)
		})
	}
}
