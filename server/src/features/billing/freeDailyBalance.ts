import { dollarsToMicrodollars } from 'utils/microdollars'
import type { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

/** Дневной бесплатный баланс из mainConfig в микродолларах. Его же пользователь получает при регистрации. */
export function getFreeDailyBalanceInMicrodollars(mainConfig: MainConfigService): number {
	return dollarsToMicrodollars(mainConfig.get().billing.freeDailyBalanceInDollars)
}
