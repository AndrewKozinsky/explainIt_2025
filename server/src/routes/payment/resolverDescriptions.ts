import { PaymentResolver } from './payment.resolver'

export const paymentResolversDesc: Record<keyof typeof PaymentResolver.prototype, string> = {
	buySubscriptionWithYooKassa: 'Buy a subscription with YooKassa',
}
