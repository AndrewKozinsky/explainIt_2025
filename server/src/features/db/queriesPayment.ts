import RouteNames from 'infrastructure/routeNames'

export const queriesPayment = {
	topUpBalanceWithYooKassa(amount: number) {
		return `mutation {
				${RouteNames.PAYMENT.YOOKASSA.TOP_UP_BALANCE}(
					input: {
						amount: ${amount},
					}
				) {
				  confirmationUrl
				}
			}`
	},
}
