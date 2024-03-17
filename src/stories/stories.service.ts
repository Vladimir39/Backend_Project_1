import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { storiesReturnObject } from './return-stories.object'

@Injectable()
export class StoriesService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.stories.findMany({
			select: storiesReturnObject
		})
	}
}
