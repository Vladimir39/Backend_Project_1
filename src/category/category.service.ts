import { Injectable } from '@nestjs/common'
import { returnCategoryObject } from './return-category.object'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			},
			select: returnCategoryObject
		})
		if (!category) throw Error('Category not found')

		return category
	}
	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug
			},
			select: returnCategoryObject
		})
		if (!category) throw Error('Category not found')

		return category
	}

	async getAll(restaurantId: number) {
		return this.prisma.category.findMany({
			select: {
				...returnCategoryObject,
				products: {
					where: {
						restaurants: {
							some: {
								restaurantId
							}
						}
					}
				}
			}
		})
	}

	async create() {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: ''
			}
		})
	}

	async update(id: number, dto: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slug: dto.name
			}
		})
	}

	async delete(id: number) {
		return this.prisma.category.delete({
			where: {
				id
			}
		})
	}
}
