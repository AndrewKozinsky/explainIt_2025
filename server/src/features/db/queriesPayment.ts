import RouteNames from '../../infrastructure/routeNames'
import { OAuthProviderType } from '../../routes/auth/inputs/loginWithOAuth.input'

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
