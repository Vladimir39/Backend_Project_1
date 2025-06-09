import { calcCartItemTotalPrice } from './lib/calc-cart-item-total-price'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CartDTO, CartItemDTO, CreateCartItemValues } from './dto/cart.dto'

export type CartStateItem = {
	id: number
	quantity: number
	name: string
	imageUrl: string
	categoryId: number
	price: number
	ingredients: Array<{ name: string; price: number }>
}

@Injectable()
export class CartService {
	constructor(private prisma: PrismaService) {}

	async getCart(token: string): Promise<CartDTO> {
		try {
			if (!token) {
				return { totalAmount: 0, items: [] }
			}

			const cart = await this.prisma.cart.findFirst({
				where: {
					OR: [
						{
							token
						}
					]
				},
				include: {
					items: {
						orderBy: {
							createdAt: 'desc'
						},
						include: {
							product: {
								include: {
									category: {
										select: {
											name: true
										}
									}
								}
							},
							ingredients: true
						}
					}
				}
			})

			const totalAmount = cart.totalAmount

			const data: CartItemDTO[] = cart.items.map(item => ({
				...item,

				product: item.product,
				ingredients: item.ingredients
			}))

			const items: CartStateItem[] = data.map((item, index) => ({
				id: item.id,
				quantity: item.quantity,
				name: item.product.name,
				categoryId: item.product.categoryId,
				category: cart.items[index].product.category.name,
				imageUrl: item.product.images,
				price: calcCartItemTotalPrice(item),
				ingredients: item.ingredients.map(ingredient => ({
					name: ingredient.name,
					price: ingredient.price
				}))
			}))

			return { items, totalAmount, token }
		} catch (error) {
			console.log('[CART_GET] Server error', error)
			throw new BadRequestException('Не удалось получить корзину')
		}
	}

	async findOrCreateCart(token: string) {
		let userCart = await this.prisma.cart.findFirst({
			where: {
				token
			}
		})

		if (!userCart) {
			userCart = await this.prisma.cart.create({
				data: {
					token
				}
			})
		}
		return userCart
	}

	async findCartItem(userCart: number, data: CreateCartItemValues) {
		return await this.prisma.cartItem.findFirst({
			where: {
				cartId: userCart,
				productId: data.productId,
				ingredients: {
					every: {
						id: { in: data.ingredient }
					}
				}
			}
		})
	}

	async updateCartItemQuantity(id: number, quantity: number) {
		return await this.prisma.cartItem.update({
			where: {
				id
			},
			data: {
				quantity: quantity + 1
			}
		})
	}

	async createCartItem(id: number, data: CreateCartItemValues) {
		return await this.prisma.cartItem.create({
			data: {
				cartId: id,
				productId: data.productId,
				quantity: 1,
				ingredients: { connect: data.ingredient?.map(id => ({ id })) }
			}
		})
	}

	async updateCartTotalAmount(token: string): Promise<CartDTO> {
		const userCart = await this.prisma.cart.findFirst({
			where: {
				token
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						product: true,
						ingredients: true
					}
				}
			}
		})

		const totalAmount = userCart.items.reduce((acc, item) => {
			return acc + calcCartItemTotalPrice(item)
		}, 0)

		const cart = await this.prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				totalAmount
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						product: {
							include: {
								category: {
									select: {
										name: true
									}
								}
							}
						},
						ingredients: true
					}
				}
			}
		})

		const data: CartItemDTO[] = cart.items.map(item => ({
			...item,
			product: item.product,
			ingredients: item.ingredients
		}))

		const items: CartStateItem[] = data.map((item, index) => ({
			id: item.id,
			quantity: item.quantity,
			name: item.product.name,
			categoryId: item.product.categoryId,
			category: cart.items[index].product.category.name,
			imageUrl: item.product.images,
			price: calcCartItemTotalPrice(item),
			ingredients: item.ingredients.map(ingredient => ({
				name: ingredient.name,
				price: ingredient.price
			}))
		}))

		return { items, totalAmount, token } as CartDTO
	}

	async patchCart(
		token: string,
		id: number,
		quantity: number
	): Promise<CartDTO> {
		const cartItem = await this.prisma.cartItem.findFirst({
			where: {
				id
			}
		})
		if (!cartItem) {
			console.log('error')
		}
		await this.prisma.cartItem.update({
			where: {
				id
			},
			data: {
				quantity
			}
		})

		const userCart = await this.prisma.cart.findFirst({
			where: {
				token
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						product: true,
						ingredients: true
					}
				}
			}
		})

		const totalAmount = userCart.items.reduce((acc, item) => {
			return acc + calcCartItemTotalPrice(item)
		}, 0)

		const cart = await this.prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				totalAmount
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						product: {
							include: {
								category: {
									select: {
										name: true
									}
								}
							}
						},
						ingredients: true
					}
				}
			}
		})

		const data: CartItemDTO[] = cart.items.map(item => ({
			...item,
			product: item.product,
			ingredients: item.ingredients
		}))

		const items: CartStateItem[] = data.map((item, index) => ({
			id: item.id,
			quantity: item.quantity,
			name: item.product.name,
			categoryId: item.product.categoryId,
			category: cart.items[index].product.category.name,
			imageUrl: item.product.images,
			price: calcCartItemTotalPrice(item),
			ingredients: item.ingredients.map(ingredient => ({
				name: ingredient.name,
				price: ingredient.price
			}))
		}))

		return { items, totalAmount, token }
	}

	async deleteCart(token: string /*id: number*/): Promise<CartDTO> {
		// const deleteItemCart = await this.prisma.cartItem.deleteMany({
		// 	where: {
		// 		id
		// 	}
		// })
		const userCart = await this.prisma.cart.findFirst({
			where: {
				token
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						product: true,
						ingredients: true
					}
				}
			}
		})

		const totalAmount = userCart.items.reduce((acc, item) => {
			return acc + calcCartItemTotalPrice(item)
		}, 0)

		const cart = await this.prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				totalAmount
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						product: {
							include: {
								category: {
									select: {
										name: true
									}
								}
							}
						},
						ingredients: true
					}
				}
			}
		})

		const data: CartItemDTO[] = cart.items.map(item => ({
			...item,
			product: item.product,
			ingredients: item.ingredients
		}))

		const items: CartStateItem[] = data.map((item, index) => ({
			id: item.id,
			quantity: item.quantity,
			name: item.product.name,
			categoryId: item.product.categoryId,
			category: cart.items[index].product.category.name,
			imageUrl: item.product.images,
			price: calcCartItemTotalPrice(item),
			ingredients: item.ingredients.map(ingredient => ({
				name: ingredient.name,
				price: ingredient.price
			}))
		}))

		return { items, totalAmount, token }
	}

	async updateCartOrder(token: string) {
		const userCart = await this.prisma.cart.findFirst({
			where: {
				token
			}
		})

		await this.prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				totalAmount: 0
			}
		})
		await this.prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id
			}
		})
	}
}
