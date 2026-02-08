import { TariffResolver } from './tariff.resolver'

export const tariffResolversDesc: Record<keyof typeof TariffResolver.prototype, string> = {
	getTariffs: 'Get all tariffs',
}
