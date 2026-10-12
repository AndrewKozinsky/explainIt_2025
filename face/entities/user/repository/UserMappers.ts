import type { UserOutModel } from '@/shared/api/generated/models'
import type { UserModel } from './UserRepository'

export function mapToUser(raw: UserOutModel): UserModel {
	return {
		id: raw.id,
		email: raw.email,
		isUserConfirmed: raw.isUserConfirmed,
		balance: raw.balance,
	}
}
