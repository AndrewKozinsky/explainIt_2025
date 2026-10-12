import type { UserGender } from 'prisma/generated/client'

export type UserServiceModel = {
	id: number
	email: string
	password: string | null
	emailConfirmationCode: string | null
	confirmationCodeExpirationDate: string | null
	isEmailConfirmed: boolean
	isUserConfirmed: boolean
	balance: number
	gender: UserGender
	avatarPresetId: string | null
	avatarS3Key: string | null
}
