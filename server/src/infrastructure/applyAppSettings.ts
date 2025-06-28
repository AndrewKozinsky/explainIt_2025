import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common'
import { useContainer, ValidationError } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import * as cookieParser from 'cookie-parser'
import { AppModule } from '../app.module'
import { ApolloExceptionFilter } from './exceptions/apollo-exception.filter'
import { SentryExceptionFilter } from './exceptions/centry-exception.filter'
import * as session from 'express-session'
import { MainConfigService } from './mainConfig/mainConfig.service'
import IORedis from 'ioredis'
import { RedisStore } from 'connect-redis'
// import { UserRepository } from '../repo/user.repository'
// import { JwtAdapterService } from './jwtAdapter/jwtAdapter.service'
// import { SetUserIntoReqMiddleware } from './middlewares/setUserIntoReq.middleware'

export async function applyAppSettings(app: INestApplication) {
	app.use(cookieParser())

	// Enable NestJS DI for class-validator
	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	const mainConfig = await app.resolve(MainConfigService)
	const redis = new IORedis(mainConfig.get().redis.url)

	app.use(async (req: Request, res: Response, next: NextFunction) => {
		const sameSite = ['serverdevelop', 'servermaster'].includes(mainConfig.get().mode!) ? 'none' : 'lax'
		const secure = ['serverdevelop', 'servermaster'].includes(mainConfig.get().mode!)

		session({
			secret: mainConfig.get().session.secret,
			name: mainConfig.get().session.name,
			// resave: true,
			// saveUninitialized: false,
			rolling: true, // ⬅️ Refreshes cookie expiration on every request
			cookie: {
				maxAge: mainConfig.get().session.lifeDurationInMs,
				httpOnly: true,
				secure,
				sameSite,
			},
			store: new RedisStore({
				client: redis,
				prefix: mainConfig.get().redis.sessionsFolder,
			}),
		})

		next()
	})

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

	app.useGlobalFilters(new SentryExceptionFilter(), new ApolloExceptionFilter())
}
