'use client'

import { useUserStore } from '@/stores/userStore'

const KOPECKS_TO_RUBLES = 100

export function useBalanceDisplay() {
	const user = useUserStore((state) => state.user)
	const isLoading = useUserStore((state) => state.isLoading)

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
		isLoading,
		balanceInKopecks,
		formattedBalance: formatBalance(),
		hasUser: !!user,
	}
}
