import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { applyAppSettings } from './infrastructure/applyAppSettings'
import { MainConfigService } from './infrastructure/mainConfig/mainConfig.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	await applyAppSettings(app)

	const mainConfig = await app.resolve(MainConfigService)
	await app.listen(mainConfig.get().port)

	const programUrl = mainConfig.get().site.domainRootWithProtocol + ':' + mainConfig.get().port
	console.log('ExplainIt server has just started 🔥 at ' + programUrl)
	console.log('GraphQL Explorer is available at ' + programUrl + '/graphql')
}
bootstrap()
