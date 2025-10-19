import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common'
import { useContainer, ValidationError } from 'class-validator'
import * as cookieParser from 'cookie-parser'
import { AppModule } from '../app.module'
import { ApolloExceptionFilter } from './exceptions/apollo-exception.filter'
import * as session from 'express-session'
import { MainConfigService } from './mainConfig/mainConfig.service'
import { RedisStore } from 'connect-redis'
import { RedisService } from './redis/redis.service'

export async function applyAppSettings(app: INestApplication) {
	const mainConfig = await app.resolve(MainConfigService)

	// Setup CORS
	setUpCors(app, mainConfig)

	app.use(cookieParser())

	app.setGlobalPrefix('api')

	// Enable NestJS DI for class-validator
	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	await setUpSession(app)

	setUpGlobalPipes(app)

	app.useGlobalFilters(new ApolloExceptionFilter())
}

function setUpCors(app: INestApplication, mainConfig: MainConfigService) {
	const isOnServer = ['serverdevelop', 'servermaster'].includes(mainConfig.get().mode!)

	// For server environments, enable CORS with credentials
	if (isOnServer) {
		app.enableCors({
			origin: mainConfig.get().site.domainRootWithProtocol,
			credentials: true, // ⬅️ Required for cookies with sameSite: 'none'
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
		})
	} else {
		// For local development, allow all origins
		app.enableCors({
			origin: true,
			credentials: true,
		})
	}
}

async function setUpSession(app: INestApplication) {
	const mainConfig = await app.resolve(MainConfigService)

	const isOnServer = ['serverdevelop', 'servermaster'].includes(mainConfig.get().mode!)
	const sameSite = isOnServer ? 'none' : 'lax'
	const secure = isOnServer
	// Extract domain from domainRoot (e.g., "explainit.ru" or "dev.explainit.ru")
	const domain = isOnServer ? mainConfig.get().site.domainRoot : undefined

	const redisService = await app.resolve(RedisService)
	try {
		await redisService.connect()
	} catch (error) {
		console.error(error)
	}

	const redis = redisService.get()

	app.use(
		session({
			secret: mainConfig.get().session.secret,
			name: mainConfig.get().session.name,
			resave: true,
			saveUninitialized: false,
			rolling: true, // ⬅️ Refreshes cookie expiration on every request
			cookie: {
				maxAge: mainConfig.get().session.lifeDurationInMs,
				httpOnly: true,
				secure,
				sameSite,
				domain, // ⬅️ Explicitly set domain for server environments
			},
			store: new RedisStore({
				client: redis,
				prefix: mainConfig.get().redis.sessionsFolder,
				ttl: mainConfig.get().session.lifeDurationInMs / 1000,
			}),
		}),
	)
}

function setUpGlobalPipes(app: INestApplication) {
	// Thus ensuring all endpoints are protected from receiving incorrect data.
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			stopAtFirstError: true,
			exceptionFactory: (errors: ValidationError[]) => {
				const formattedErrors = errors.map((err) => ({
					field: err.property,
					messages: Object.values(err.constraints || []),
				}))

				return new BadRequestException(formattedErrors)
			},
		}),
	)
}
