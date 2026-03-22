export type UserServiceModel = {
	id: number
	email: string
	password: string | null
	emailConfirmationCode: string | null
	confirmationCodeExpirationDate: string | null
	isEmailConfirmed: boolean
	isUserConfirmed: boolean
	currentSubscription: null | CurrentSubscriptionServiceModel
}

export type CurrentSubscriptionServiceModel = {
	tariffId: number
	tariffCode: string
	tariffName: string
	pricePaid: number
	balance: number
	includedBalance: number
	includedFileStorageMb: number
	startsAt: string
	endsAt: string
}
