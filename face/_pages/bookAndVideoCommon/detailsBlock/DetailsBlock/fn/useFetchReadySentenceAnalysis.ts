import { useEffect } from 'react'
import { useUserStore } from 'stores/userStore'
import { useSentenceTranslation_GetBySentenceIdLazyQuery } from '@/graphql'
import { useDetailsStore } from '_pages/bookAndVideoCommon/detailsBlock/detailsStore'

export function useFetchReadySentenceAnalysis() {
	const user = useUserStore((state) => state.user)
	const sentenceId = useDetailsStore((s) => s.sentenceId)
	const viewType = useDetailsStore((s) => s.viewType)

	const [fetchTranslations, { called, data, loading, error }] = useSentenceTranslation_GetBySentenceIdLazyQuery()

	useEffect(
		function () {
			if (!sentenceId || viewType !== 'VIEW_FULL') return

			useDetailsStore.getState().updateStore({
				sentenceTranslation: null,
				sentenceAnalysis: null,
				sentenceAnalysisLoading: true,
			})

			fetchTranslations({ variables: { input: { sentenceId } } })
		},
		[fetchTranslations, sentenceId, viewType],
	)

	useEffect(
		function () {
			if (!called) return

			if (loading) {
				useDetailsStore.getState().updateStore({ sentenceAnalysisLoading: true, sentenceAnalysisError: null })
				return
			}

			if (error) {
				useDetailsStore
					.getState()
					.updateStore({ sentenceAnalysisLoading: false, sentenceAnalysisError: error.message })

				return
			}

			const translations = data?.sentence_translation_get_by_sentence_id
			if (!translations?.length) {
				if (user) {
					useDetailsStore.setState({ sentenceAnalysisReqType: 'TRANSLATE' })
				} else {
					useDetailsStore.setState({ sentenceAnalysisLoading: false, viewType: 'LOGIN_REQUIRED' })
				}

				return
			} else {
				useDetailsStore.setState({
					sentenceTranslation: translations[0].translation,
					sentenceAnalysis: translations[0].analysis,
					sentenceAnalysisLoading: false,
				})
			}
		},
		[called, data, error, loading, user],
	)
}
