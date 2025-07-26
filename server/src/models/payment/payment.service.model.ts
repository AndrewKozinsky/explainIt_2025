export type PaymentServiceModel = {
	id: number
	userId: number
	amount: number
	externalId: string
	status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELED'
	providerName: 'YOOKASSA'
}
