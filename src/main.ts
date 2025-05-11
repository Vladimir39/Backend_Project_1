import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.enableCors({
		origin: ['https://dimshashlik.ru/', 'http://localhost:3000'], // Разрешенные источники
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные методы
		credentials: true // Если нужны куки или авторизация
	})
	app.use(cookieParser())
	await app.listen(3001)
}
bootstrap()
