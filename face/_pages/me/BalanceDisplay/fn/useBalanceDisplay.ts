'use client'

import { useUser } from '@/shared/api/auth/UserProvider'

const KOPECKS_TO_RUBLES = 100

export function useBalanceDisplay() {
	const user = useUser()

	const balanceInKopecks = user?.balance ?? 0
	const balanceInRubles = Math.floor(balanceInKopecks / KOPECKS_TO_RUBLES)
	const kopecks = balanceInKopecks % KOPECKS_TO_RUBLES

	function formatBalance(): string {
		if (balanceInRubles === 0 && kopecks === 0) {
			return '0 ₽'
		}
		if (kopecks === 0) {
			return `${balanceInRubles} ₽`
		}
		return `${balanceInRubles},${String(kopecks).padStart(2, '0')} ₽`
	}

	return {
		balanceInKopecks,
		formattedBalance: formatBalance(),
		hasUser: !!user,
	}
}
