import { useEffect } from 'react'
import { produce } from 'immer'
import { useDetailsStore, DetailsStoreNext } from '../../detailsStore'

export function useShowCurrentTranslation() {
	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)

	useEffect(
		function () {
			if (currentSentenceId === null) return

			useDetailsStore.setState(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === currentSentenceId)
					if (entry) {
						entry.data.translation.visible = true
					}
				}),
			)
		},
		[currentSentenceId],
	)
}
