export type TariffServiceModel = {
	id: number
	code: string
	slogan: string
	name: string
	description: string
	isPublicMediaIncluded: boolean
	isPrivateMediaIncluded: boolean
	price: number
	durationDays: number
	includedBalance: number
	includedFileStorageMb: number
	createdAt: Date
}
