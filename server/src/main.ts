import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { applyAppSettings } from './infrastructure/applyAppSettings'
import { MainConfigService } from './infrastructure/mainConfig/mainConfig.service'
import { json, urlencoded } from 'express'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Increase request body size limits to 10 MB for JSON and URL-encoded payloads
	app.use(json({ limit: '10mb' }))
	app.use(urlencoded({ extended: true, limit: '10mb' }))

	await applyAppSettings(app)

	const mainConfig = await app.resolve(MainConfigService)
	await app.listen(mainConfig.get().port)

	const programUrl = mainConfig.get().site.domainRootWithProtocol + ':' + mainConfig.get().port
	console.log('ExplainIt server has just started 🔥 at ' + programUrl)
	console.log('GraphQL Explorer is available at ' + programUrl + '/graphql')
}
bootstrap()
