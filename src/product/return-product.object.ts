import { Prisma } from '@prisma/client'

export const productReturnObject: Prisma.ProductSelect = {
	images: true,
	description: true,
	id: true,
	name: true,
	price: true,
	createdAt: true,
	slug: true,
	categoryId: true,
	category: true,
	popular: true
}
