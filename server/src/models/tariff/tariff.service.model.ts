export type TariffServiceModel = {
	id: number
	code: string
	name: string
	price: number
	durationDays: number
	includedBalance: number
	includedFileStorageMb: number
	createdAt: Date
}
