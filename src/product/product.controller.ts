import { Prisma } from '@prisma/client'
import {
	Controller,
	Get,
	Param,
	Body,
	UsePipes,
	HttpCode,
	Post,
	Put,
	Delete,
	ValidationPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductDto } from './product.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.productService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAllSous(@Param('ids') ids: string) {
		return this.productService.getAllSous(ids.split(',').map(id => +id))
	}

	@UsePipes(new ValidationPipe())
	@Get(':id')
	async byId(@Param('id') id: string) {
		return this.productService.byId(+id)
	}

	@UsePipes(new ValidationPipe())
	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.productService.bySlug(slug)
	}

	@UsePipes(new ValidationPipe())
	@Get('by-category/:categorySlug')
	async byCategory(@Param('categorySlug') categorySlug: string) {
		console.log(categorySlug)
		return this.productService.byCategory(categorySlug)
	}

	@HttpCode(200)
	@Auth()
	@Post()
	async create() {
		return this.productService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.productService.delete(+id)
	}
}
