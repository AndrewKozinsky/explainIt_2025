import { UserApi } from './repository/UserApi'
import type { UserRepository } from './repository/UserRepository'

export type { UserModel, UserRepository } from './repository/UserRepository'

/** Сервис пользователя — прослойка между компонентами и репозиторием. */
export class UserService {
	constructor(private readonly repository: UserRepository) {}

	getMe() {
		return this.repository.getMe()
	}
}

export const userService = new UserService(new UserApi())
