import { Prisma } from '@prisma/client'

export const productReturnObject: Prisma.ProductSelect = {
	images: true,
	description: true,
	id: true,
	name: true,
	price: true,
	slug: true,
	categoryId: true,
	category: true,
	popular: true,
	countPopular: true,
	ingredients: true,
	availability: true
}
