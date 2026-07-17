import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { UserRepository } from 'repo/user.repository'

@Injectable()
export class OptionalSessionUserGuard implements CanActivate {
	constructor(private userRepository: UserRepository) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<Request>()
		request.user = null

		const userId = request.session?.userId

		if (!userId) {
			return true
		}

		const user = await this.userRepository.getUserById(userId)
		request.user = user

		return true
	}
}
