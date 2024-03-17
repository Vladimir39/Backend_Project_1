import { Prisma } from '@prisma/client'

export const storiesReturnObject: Prisma.StoriesSelect = {
	id: true,
	name: true,
	images: true,
	storiesItem: true
}
