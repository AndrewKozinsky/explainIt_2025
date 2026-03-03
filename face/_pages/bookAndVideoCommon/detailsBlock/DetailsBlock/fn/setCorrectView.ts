import { useEffect } from 'react'
import { useUserStore } from 'stores/userStore'
import { DetailsStoreViewType, useDetailsStore } from '_pages/bookAndVideoCommon/detailsBlock/detailsStore'

export function useSetCorrectView() {
	const user = useUserStore((s) => s.user)
	const sentenceTranslation = useDetailsStore((s) => s.sentenceTranslation)
	const analysisExistStatus = useDetailsStore((s) => s.analysisExistStatus)

	const isMediaFreeToUse = useDetailsStore((s) => s.isMediaFreeToUse)
	const isAuthenticated = !!user
	const hasBasicSubscription = !!user?.currentSubscription
	const hasSubscriptionToTranslatePrivateMedia = !!user?.currentSubscription?.isPrivateMediaIncluded
	const hasSubscriptionToTranslatePublicMedia = !!user?.currentSubscription?.isPublicMediaIncluded
	const selectedSentenceId = useDetailsStore((s) => s.sentenceId)
	const translationStatus = useDetailsStore((s) => s.analysisExistStatus)

	useEffect(
		function () {
			let detailsViewType: null | DetailsStoreViewType = null

			if (!selectedSentenceId) {
				detailsViewType = 'CAN_CREATE'
			}

			if (selectedSentenceId) {
				if (isMediaFreeToUse && isAuthenticated) {
					detailsViewType = 'VIEW_FULL'
				}
				if (isMediaFreeToUse && !isAuthenticated) {
					detailsViewType = 'VIEW_FULL'
				}
				if (!isMediaFreeToUse && isAuthenticated && hasSubscriptionToTranslatePublicMedia) {
					detailsViewType = 'VIEW_FULL'
				}
				if (!isMediaFreeToUse && isAuthenticated && hasSubscriptionToTranslatePrivateMedia) {
					detailsViewType = 'VIEW_FULL'
				}
			}

			if (!isMediaFreeToUse && !isAuthenticated) {
				detailsViewType = 'LOGIN_AND_SUBSCRIPTION_REQUIRED'
			}

			if (!isMediaFreeToUse && isAuthenticated && !hasBasicSubscription) {
				detailsViewType = 'SUBSCRIPTION_REQUIRED'
			}

			if (detailsViewType) {
				useDetailsStore.getState().updateStore({
					viewType: detailsViewType,
				})
			}
		},
		[
			hasBasicSubscription,
			isAuthenticated,
			isMediaFreeToUse,
			sentenceTranslation,
			analysisExistStatus,
			translationStatus,
			selectedSentenceId,
			hasSubscriptionToTranslatePrivateMedia,
			hasSubscriptionToTranslatePublicMedia,
		],
	)
}
