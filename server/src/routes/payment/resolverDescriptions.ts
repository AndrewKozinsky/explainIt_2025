import { PaymentResolver } from './payment.resolver'

export const paymentResolversDesc: Record<keyof typeof PaymentResolver.prototype, string> = {
	topUpBalanceWithYooKassa: 'Top up a balance with YooKassa',
}
