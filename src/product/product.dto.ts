import { Prisma } from '@prisma/client'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class ProductDto implements Prisma.ProductUpdateInput {
	@IsString()
	name: string | Prisma.StringFieldUpdateOperationsInput

	@IsNumber()
	price: number | Prisma.IntFieldUpdateOperationsInput

	@IsOptional()
	@IsString()
	description: string | Prisma.StringFieldUpdateOperationsInput

	@IsString()
	images: string | Prisma.StringFieldUpdateOperationsInput

	@IsNumber()
	categoryId: number | Prisma.CategoryUpdateOneWithoutProductsNestedInput

	@IsString()
	slug: string | Prisma.StringFieldUpdateOperationsInput

	@IsString()
	popular?: boolean | Prisma.BoolFieldUpdateOperationsInput

	@IsNumber()
	countPopular?: number | Prisma.IntFieldUpdateOperationsInput

	@IsNumber()
	category?: Prisma.CategoryUpdateOneWithoutProductsNestedInput

	@IsNumber()
	availability?: boolean | Prisma.NullableBoolFieldUpdateOperationsInput
}
