import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Request, Response } from 'express'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export class LogoutCommand {
	constructor(
		public request: Request,
		public response: Response,
	) {}
}

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
	constructor(private mainConfig: MainConfigService) {}

	async execute(command: LogoutCommand) {
		const { request, response } = command

		return new Promise((resolve, reject) => {
			request.session.destroy((err) => {
				if (err) {
					return reject(
						new CustomError(errorMessage.cannotFinishSession, ErrorStatusCode.InternalServerError_500),
					)
				}

				response.clearCookie(this.mainConfig.get().session.name)
				resolve(true)
			})
		})
	}
}
