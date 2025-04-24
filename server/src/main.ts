import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MainConfigService } from './infrastructure/mainConfig/mainConfig.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Enable CORS for all origins
	// app.enableCors()

	const mainConfig = await app.resolve(MainConfigService)
	await app.listen(mainConfig.get().port)
	console.log('ExplainIt server has just started 🔥 at http://localhost:' + mainConfig.get().port)
	console.log('GraphQL Explorer is available at http://localhost:' + mainConfig.get().port + '/graphql')
}
bootstrap()
