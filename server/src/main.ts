import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MainConfigService } from './infrastructure/mainConfig/mainConfig.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const mainConfig = await app.resolve(MainConfigService)
	await app.listen(mainConfig.get().port)
	console.log('ExplainIt server has just started 🔥')
}
bootstrap()
