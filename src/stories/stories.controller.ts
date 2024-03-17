import { Controller, Get } from '@nestjs/common'
import { StoriesService } from './stories.service'

@Controller('stories')
export class StoriesController {
	constructor(private readonly storiesService: StoriesService) {}

	@Get()
	async getAll() {
		return this.storiesService.getAll()
	}
}
