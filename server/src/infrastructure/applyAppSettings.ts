import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common'
import { useContainer, ValidationError } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import * as cookieParser from 'cookie-parser'
import { AppModule } from '../app.module'
import { ApolloExceptionFilter } from './exceptions/apollo-exception.filter'
// import { MainConfigService } from './config/mainConfig.service'
// import { UserRepository } from '../repo/user.repository'
// import { JwtAdapterService } from './jwtAdapter/jwtAdapter.service'
// import { SetUserIntoReqMiddleware } from './middlewares/setUserIntoReq.middleware'

export async function applyAppSettings(app: INestApplication) {
	app.use(cookieParser())

	// Enable NestJS DI for class-validator
	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	// const mainConfig = await app.resolve(MainConfigService)

	/*app.use(async (req: Request, res: Response, next: NextFunction) => {
		const jwtService = await app.resolve(JwtAdapterService)
		const userRepository = await app.resolve(UserRepository)
		const mainConfig = await app.resolve(MainConfigService)

		const userMiddleware = new SetUserIntoReqMiddleware(jwtService, userRepository, mainConfig)
		await userMiddleware.use(req, res, next)
	})*/

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

	app.useGlobalFilters(new ApolloExceptionFilter())
}
