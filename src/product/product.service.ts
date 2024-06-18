import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductDto } from './product.dto'
import { productReturnObject } from './return-product.object'

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.product.findMany({
			select: productReturnObject
		})
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id
			},
			select: productReturnObject
		})
		if (!product) throw new NotFoundException('product not found')

		return product
	}
	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug
			},
			select: productReturnObject
		})
		if (!product) throw new NotFoundException('product not found')

		return product
	}

	async byCategory(categorySlug: string) {
		const product = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			},
			select: productReturnObject
		})
		if (!product) throw new NotFoundException('product not found')

		return product
	}

	async create() {
		const product = await this.prisma.product.create({
			data: {
				description: '',
				images: '',
				name: '',
				price: 0,
				slug: '',
				popular: false
			}
		})

		return product.id
	}

	async update(id: number, dto: ProductDto) {
		const {
			description,
			images,
			name,
			price,
			slug,
			categoryId,
			popular,
			countPopular
		} = dto

		return this.prisma.product.update({
			where: {
				id
			},
			data: {
				description,
				images,
				name,
				price,
				slug,
				popular,
				countPopular,
				category: {
					connect: {
						id: +categoryId
					}
				}
			}
		})
	}

	async delete(id: number) {
		return this.prisma.product.delete({
			where: {
				id
			}
		})
	}
}
