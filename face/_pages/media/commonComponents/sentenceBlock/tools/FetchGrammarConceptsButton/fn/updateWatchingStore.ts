import { useWatchingStore, WatchingStoreValues } from '_pages/media/watching/watchingStore'

/**
 * Пытается обновить watching store полученными грамматическими концептами.
 * Возвращает true, если в сторе были данные и обновление произведено.
 */
export function tryUpdateWatchingStore(
	sentenceId: number,
	grammarConcepts: any[],
	missingGrammarConcepts: any[],
): boolean {
	const state = useWatchingStore.getState()

	// Проверяем, что watching store активен (есть данные в populatedSubtitles или populatedPlainText)
	if (!state.populatedSubtitles && !state.populatedPlainText) {
		return false
	}

	const storeUpdate: Partial<WatchingStoreValues> = {}

	// Обновляем сырые данные (источник истины для WatchingDetailsBlock)
	if (state.video?.data?.sentences) {
		storeUpdate.video = {
			...state.video,
			data: {
				...state.video.data,
				sentences: state.video.data.sentences.map((sentence) =>
					sentence.id === sentenceId
						? ({ ...sentence, grammarConcepts, missingGrammarConcepts } as typeof sentence)
						: sentence,
				) as typeof state.video.data.sentences,
			},
		} as typeof state.video
	}

	// Обновляем populatedSubtitles (режим субтитров)
	if (state.populatedSubtitles) {
		storeUpdate.populatedSubtitles = {
			...state.populatedSubtitles,
			sentences: state.populatedSubtitles.sentences.map((sentence) =>
				sentence.id === sentenceId
					? ({ ...sentence, grammarConcepts, missingGrammarConcepts } as typeof sentence)
					: sentence,
			),
		}
	}

	// Обновляем populatedPlainText (режим Plain Text)
	if (state.populatedPlainText) {
		storeUpdate.populatedPlainText = {
			...state.populatedPlainText,
			sentences: state.populatedPlainText.sentences.map((sentence) =>
				sentence.id === sentenceId
					? ({ ...sentence, grammarConcepts, missingGrammarConcepts } as typeof sentence)
					: sentence,
			),
		}
	}

	state.updateStore(storeUpdate)
	return true
}
