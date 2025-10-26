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
	// Trust proxy to correctly handle X-Forwarded-* headers from Nginx
	const expressApp = app.getHttpAdapter().getInstance()
	expressApp.set('trust proxy', 1)

	app.use(cookieParser())

	// Debug middleware to log headers
	app.use((req: any, res: any, next: any) => {
		console.log('=== Incoming Request ===')
		console.log('Protocol:', req.protocol)
		console.log('Secure:', req.secure)
		console.log('X-Forwarded-Proto:', req.headers['x-forwarded-proto'])
		console.log('X-Forwarded-For:', req.headers['x-forwarded-for'])
		console.log('Host:', req.headers.host)
		console.log('Cookie:', req.headers.cookie)

		// Log response Set-Cookie header
		const originalSetHeader = res.setHeader.bind(res)
		res.setHeader = function (name: string, value: any) {
			if (name.toLowerCase() === 'set-cookie') {
				console.log('=== Setting Cookie ===')
				console.log('Set-Cookie:', value)
			}
			return originalSetHeader(name, value)
		}

		next()
	})

	app.setGlobalPrefix('api')

	// Enable NestJS DI for class-validator
	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	await setUpSession(app)

	setUpGlobalPipes(app)

	app.useGlobalFilters(new ApolloExceptionFilter())
}

async function setUpSession(app: INestApplication) {
	const redisService = await app.resolve(RedisService)
	try {
		await redisService.connect()
	} catch (error) {
		console.error(error)
	}

	const redis = redisService.get()

	const mainConfig = await app.resolve(MainConfigService)

	// For same-site requests (nginx proxies everything to one domain), 'lax' is sufficient
	const isProduction = ['serverdevelop', 'servermaster'].includes(mainConfig.get().mode!)
	const secure = isProduction

	// Extract domain from config for production environments
	const cookieConfig: any = {
		maxAge: mainConfig.get().session.lifeDurationInMs,
		httpOnly: true,
		secure,
		sameSite: 'lax', // ⬅️ 'lax' works for same-site requests (frontend and backend on same domain)
	}

	console.log('=== Session Configuration ===')
	console.log('Mode:', mainConfig.get().mode)
	console.log('Is Production:', isProduction)
	console.log('Cookie Config:', cookieConfig)
	console.log('Session Name:', mainConfig.get().session.name)

	app.use(
		session({
			secret: mainConfig.get().session.secret,
			name: mainConfig.get().session.name,
			resave: true,
			saveUninitialized: false,
			rolling: true, // ⬅️ Refreshes cookie expiration on every request
			cookie: cookieConfig,
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
