import { useEffect } from 'react'
import { useUserStore } from 'stores/userStore'
import { useDetailsStore } from '_pages/bookAndVideoCommon/detailsBlock/detailsStore'

export function useSetCorrectView() {
	const user = useUserStore((s) => s.user)
	const translation = useDetailsStore((s) => s.translation)
	const isMediaFreeToUse = useDetailsStore((s) => s.isMediaFreeToUse)
	const isAuthenticated = !!user
	const hasBasicSubscription = !!user?.currentSubscription
	const hasBalance = !!user?.currentSubscription?.balance
	const translationStatus = translation ? 'EXISTS' : translation === null ? 'NOT_EXISTS' : 'UNKNOWN'

	useEffect(
		function () {
			const detailsViewType = getAnalysisViewName({
				isMediaFreeToUse,
				isAuthenticated,
				hasBasicSubscription,
				hasBalance,
				translationStatus,
			})

			useDetailsStore.getState().updateStore({
				viewType: detailsViewType,
			})
		},
		[hasBalance, hasBasicSubscription, isAuthenticated, isMediaFreeToUse, translation, translationStatus],
	)
}

function getAnalysisViewName(ctx: {
	isMediaFreeToUse: boolean
	isAuthenticated: boolean
	hasBasicSubscription: boolean
	hasBalance: boolean
	translationStatus: 'EXISTS' | 'NOT_EXISTS' | 'UNKNOWN'
}) {
	const { isMediaFreeToUse, isAuthenticated, hasBasicSubscription, hasBalance, translationStatus } = ctx

	// =====================================================
	// 1. Книга свободна для чтения
	// =====================================================
	if (isMediaFreeToUse) {
		// Пользователь нажал на предложение
		if (translationStatus === 'UNKNOWN') {
			return 'CAN_CREATE'
		}

		if (translationStatus === 'EXISTS') {
			return isAuthenticated ? 'VIEW_FULL' : 'VIEW_PREVIEW'
		}

		// NOT_EXISTS
		return isAuthenticated ? 'CAN_CREATE' : 'LOGIN_REQUIRED'
	}

	// =====================================================
	// 2. Книга НЕ свободна для чтения
	// =====================================================

	// Пользователь авторизован?
	if (!isAuthenticated) {
		return 'SUBSCRIPTION_REQUIRED'
	}

	// Есть хотя бы базовая подписка?
	if (!hasBasicSubscription) {
		return 'SUBSCRIPTION_REQUIRED'
	}

	// Может создавать
	if (translationStatus === 'UNKNOWN') {
		return 'CAN_CREATE'
	}

	if (translationStatus === 'EXISTS') {
		return 'VIEW_FULL'
	}

	// NOT_EXISTS — проверяем баланс
	if (!hasBalance) {
		return 'BALANCE_REQUIRED'
	}

	return 'CAN_CREATE'
}
