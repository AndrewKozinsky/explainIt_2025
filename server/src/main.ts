import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { json, urlencoded } from 'express'
import { applyAppSettings } from 'infrastructure/applyAppSettings'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

	// Increase request body size limits to 10 MB for JSON and URL-encoded payloads
	app.use(json({ limit: '10mb' }))
	app.use(urlencoded({ extended: true, limit: '10mb' }))

	await applyAppSettings(app)

	const mainConfig = await app.resolve(MainConfigService)
	await app.listen(mainConfig.get().port)

	const programUrl = mainConfig.get().site.domainRootWithProtocol + ':' + mainConfig.get().port
	console.log('ExplainIt server has just started 🔥 at ' + programUrl)
	console.log('Swagger docs are available at ' + programUrl + '/api/docs')
}
bootstrap()
