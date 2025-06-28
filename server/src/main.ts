// IMPORTANT: Make sure to import `instrument.ts` at the top of your file.
// If you're using CommonJS (CJS) syntax, use `require("./instrument.ts");`
import './instrument.ts'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { applyAppSettings } from './infrastructure/applyAppSettings'
import { MainConfigService } from './infrastructure/mainConfig/mainConfig.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	await applyAppSettings(app)

	// Enable CORS for all origins
	// app.enableCors()

	const mainConfig = await app.resolve(MainConfigService)
	await app.listen(mainConfig.get().port)
	console.log('ExplainIt server has just started 🔥 at http://localhost:' + mainConfig.get().port)
	console.log('GraphQL Explorer is available at http://localhost:' + mainConfig.get().port + '/graphql')
}
bootstrap()
