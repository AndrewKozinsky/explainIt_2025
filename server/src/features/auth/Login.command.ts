import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { LoginInputModel } from '../../models/auth/auth.input.model'
import { UserOutModel } from '../../models/user/user.out.model'
import { UserRepository } from '../../repo/user.repository'
import { Request } from 'express'
import { UserQueryRepository } from 'src/repo/user.queryRepository'

export class LoginCommand implements ICommand {
	constructor(
		public request: Request,
		public loginInput: LoginInputModel,
		public clientIP: string,
		public clientName: string,
	) {}
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
	constructor(
		private userRepository: UserRepository,
		private userQueryRepository: UserQueryRepository,
	) {}

	async execute(command: LoginCommand) {
		const { request, loginInput, clientIP, clientName } = command

		const user = await this.userRepository.getUserByEmailAndPassword(loginInput.email, loginInput.password)
		if (!user) {
			throw new CustomGraphQLError(errorMessage.userNotFound, ErrorCode.BadRequest_400)
		}

		if (!user.isEmailConfirmed) {
			throw new CustomGraphQLError(errorMessage.emailIsNotConfirmed, ErrorCode.Forbidden_403)
		}

		const outUser = await this.userQueryRepository.getUserById(user.id)
		if (!outUser) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return await this.saveSession(request, outUser, clientIP, clientName)
	}

	public async saveSession(req: Request, user: UserOutModel, clientIP: string, clientName: string) {
		return new Promise((resolve, reject) => {
			if (!req.session) {
				throw new CustomGraphQLError(errorMessage.noSessionObject, ErrorCode.InternalServerError_500)
			}

			req.session.userId = user.id
			req.session.clientIP = clientIP
			req.session.clientName = clientName

			req.session.save((err) => {
				if (err) {
					return reject(
						new CustomGraphQLError(errorMessage.cannotSaveSession, ErrorCode.InternalServerError_500),
					)
				}

				resolve(user)
			})
		})
	}
}
