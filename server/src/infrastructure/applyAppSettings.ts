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
	app.use(cookieParser())

	app.setGlobalPrefix('api')

	// Enable NestJS DI for class-validator
	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	await setUpSession(app)

	setUpGlobalPipes(app)

	app.useGlobalFilters(new ApolloExceptionFilter())
}

async function setUpSession(app: INestApplication) {
	const mainConfig = await app.resolve(MainConfigService)

	// For same-site requests (nginx proxies everything to one domain), 'lax' is sufficient
	const secure = ['serverdevelop', 'servermaster'].includes(mainConfig.get().mode!)

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
				sameSite: 'lax', // ⬅️ 'lax' works for same-site requests (frontend and backend on same domain)
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
