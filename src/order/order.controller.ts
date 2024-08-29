import { Controller, Post, Req, Res } from '@nestjs/common'
import { OrderService } from './order.service'

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	async createPost(@Req() request: Request, @Res() res: Response) {
		const token = request.headers['authorization']
		const data = request.body
		console.log(token)
		console.log(request.body)
		return res.json
	}
}
