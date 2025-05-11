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

	private buildOrderMessage(orderBuy: Order): string {
		const items = JSON.parse(orderBuy.items as string)

		const orderDetails = items
			.map(obj => {
				const ingredientsList = obj.ingredients?.length
					? obj.ingredients
							.map(item => `Доп. к блюду: ${item.name} 1 ед.`)
							.join('\n')
					: ''
				return `*********************************\n${obj.category.toUpperCase()} - ${
					obj.name
				}
${ingredientsList}
Всего ${obj.quantity} ед. - стоимость ${obj.price}р. за ед.
*********************************`
			})
			.join('\n')

		const fields: string[] = []

		if (orderBuy.id) fields.push(`Номер заказа: ${orderBuy.id}`)
		if (orderBuy.delivery)
			fields.push(`-- ТИП: ${orderBuy.delivery.toUpperCase()} --`)
		if (orderBuy.address) fields.push(`Улица: - ${orderBuy.address}`)
		if (orderBuy.house) fields.push(`Номер дома: - ${orderBuy.house}`)
		if (orderBuy.flat) fields.push(`Квартира: - ${orderBuy.flat}`)
		if (orderBuy.entrance) fields.push(`Подъезд: - ${orderBuy.entrance}`)
		if (orderBuy.floor) fields.push(`Этаж: - ${orderBuy.floor}`)
		if (orderBuy.timeDelivery)
			fields.push(`Время доставки: - ${orderBuy.timeDelivery}`)
		if (orderBuy.comment) fields.push(`Доп. информация: - ${orderBuy.comment}`)

		fields.push('-- ДАННЫЕ ПО КЛИЕНТУ --')
		if (orderBuy.fullName) fields.push(`Имя: - ${orderBuy.fullName}`)
		if (orderBuy.phone) fields.push(`Номер телефона: - ${orderBuy.phone}`)

		fields.push('\n==================\n')
		if (orderDetails) fields.push(`Блюда:\n${orderDetails}`)
		if (orderBuy.totalAmount)
			fields.push(`Сумма по заказу: ${orderBuy.totalAmount}.00р.`)

		return fields.join('\n')
	}

	async orderAdmin(orderBuy: Order) {
		const adminChatIds = [
			'1144477936',
			'5114637480',
			'5205922440',
			'5656520171',
			'5864038346',
			'5805596687'
		]
		const message = this.buildOrderMessage(orderBuy)

		for (const chatId of adminChatIds) {
			await this.bot.telegram.sendMessage(chatId, message)
		}
	}
}
