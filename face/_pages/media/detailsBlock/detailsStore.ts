// import { produce } from 'immer'
// import { create } from 'zustand'

/*export const detailsStoreValues: DetailsStoreValues = {
	bookName: null,
	bookAuthor: null,
	videoName: null,
	videoYear: null,
	languageCode: null,
	currentSentenceId: null,
	currentSentenceText: null,
	currentWordId: null,
	sentences: [],
	transcriptions: [],
}*/

/*export const useDetailsStore = create<DetailsStoreNext>()((set, get) => {
	return {
		...detailsStoreValues,
		clearStoreData: () => {
			set(detailsStoreValues)
		},
		updateStore: (storePart: Partial<DetailsStoreValues>) => {
			set(storePart)
		},
		insertLoadingSentence: (input: { sentenceId: number; text: string }) => {
			set(
				produce((state: DetailsStoreNext) => {
					state.sentences.push({
						sentenceId: input.sentenceId,
						selectedPhraseId: null,
						data: {
							sentence: {
								text: input.text,
								loading: true,
								error: null,
								translation: null,
							},
							phrases: [],
						},
					})
				}),
			)
		},
		patchSentenceTranslation: (input: { sentenceId: number; patch: Partial<SentenceTranslation> }) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					Object.assign(entry.data.sentence, input.patch)
				}),
			)
		},
		upsertPhraseTranslation: (input: { sentenceId: number; phrase: SentencePhrase }) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					const phraseIdx = entry.data.phrases.findIndex((item) =>
						sameWordIds(item.wordIds, input.phrase.wordIds),
					)

					if (phraseIdx >= 0) {
						const existingId = entry.data.phrases[phraseIdx].randomGeneratedPhraseId
						entry.data.phrases[phraseIdx] = { ...input.phrase, randomGeneratedPhraseId: existingId }
						return
					}

					entry.data.phrases.push(input.phrase)
				}),
			)
		},
		patchPhraseTranslation: (input: { sentenceId: number; phraseId: string; patch: Partial<SentencePhrase> }) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					const phrase = entry.data.phrases.find((item) => item.randomGeneratedPhraseId === input.phraseId)
					if (!phrase) return

					Object.assign(phrase, input.patch)
				}),
			)
		},
		finalizePhraseTranslation: (input: {
			sentenceId: number
			placeholderPhraseId: string
			phrase: SentencePhrase
		}) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					const placeholderIdx = entry.data.phrases.findIndex(
						(item) => item.randomGeneratedPhraseId === input.placeholderPhraseId,
					)
					const existingIdx = entry.data.phrases.findIndex(
						(item) =>
							item.randomGeneratedPhraseId !== input.placeholderPhraseId &&
							sameWordIds(item.wordIds, input.phrase.wordIds),
					)

					if (existingIdx >= 0) {
						const existingId = entry.data.phrases[existingIdx].randomGeneratedPhraseId
						entry.data.phrases[existingIdx] = { ...input.phrase, randomGeneratedPhraseId: existingId }

						if (placeholderIdx >= 0) {
							entry.data.phrases.splice(placeholderIdx, 1)
						}
						if (entry.selectedPhraseId === input.placeholderPhraseId) {
							entry.selectedPhraseId = existingId
						}
						return
					}

					if (placeholderIdx >= 0) {
						entry.data.phrases[placeholderIdx] = {
							...input.phrase,
							randomGeneratedPhraseId: input.placeholderPhraseId,
						}
						return
					}

					entry.data.phrases.push({ ...input.phrase, randomGeneratedPhraseId: input.placeholderPhraseId })
				}),
			)
		},
		setSelectedPhraseId: (input: { sentenceId: number; phraseId: string | null }) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					entry.selectedPhraseId = input.phraseId
				}),
			)
		},
		setPhraseFlashcardId: (input: { sentencePhraseId: number; flashcardId: null | number }) => {
			set(
				produce((state: DetailsStoreNext) => {
					for (const entry of state.sentences) {
						const phrase = entry.data.phrases.find(
							(item) => item.sentencePhraseId === input.sentencePhraseId,
						)
						if (!phrase) continue

						phrase.flashcardId = input.flashcardId
					}
				}),
			)
		},
	}
})*/

/*export function makePhraseId(): string {
	return 'p_' + Math.random().toString(36).slice(2) + '_' + Date.now().toString(36)
}*/

/*function sameWordIds(a: number[], b: number[]): boolean {
	if (a.length !== b.length) return false

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false
	}

	return true
}*/

// export type DetailsStoreNext = DetailsStoreValues & DetailsStoreMethods

/*export type DetailsTranscription = {
	phrase: string
	transcription: string
}*/

/*export type DetailsSentenceEntry = {
	sentenceId: number
	selectedPhraseId: string | null
	data: {
		sentence: SentenceTranslation
		phrases: SentencePhrase[]
	}
}*/

/*export type SentenceTranslation = {
	text: string
	loading: boolean
	error: null | string
	translation: null | string
}*/

/*export type SentencePhrase = {
	// id фразы предложения генерируется на клиенте потому что запрос на сервер на создание фразы идёт после того, как фраза создаётся в Хранилище
	randomGeneratedPhraseId: string
	// Id фразы из предложения, созданной на сервере
	sentencePhraseId: null | number
	// Id флешкарты текущего пользователя для этой фразы. null если пользователь анонимный или карточки ещё нет.
	flashcardId: null | number
	wordIds: number[]
	phrase: null | string
	loading: boolean
	error: null | string
	translation: null | string
	examples: PhraseExample[]
}*/

/*export type PhraseExample = {
	text: string
	translate: string
}*/

/*export type DetailsStoreValues = {
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	languageCode: null | string
	currentSentenceId: null | number
	currentSentenceText: null | string
	currentWordId: null | number
	sentences: DetailsSentenceEntry[]
	transcriptions: DetailsTranscription[]
}*/

/*export type DetailsStoreMethods = {
	clearStoreData: () => void
	updateStore: (store: Partial<DetailsStoreValues>) => void
	insertLoadingSentence: (input: { sentenceId: number; text: string }) => void
	patchSentenceTranslation: (input: { sentenceId: number; patch: Partial<SentenceTranslation> }) => void
	upsertPhraseTranslation: (input: { sentenceId: number; phrase: SentencePhrase }) => void
	patchPhraseTranslation: (input: { sentenceId: number; phraseId: string; patch: Partial<SentencePhrase> }) => void
	finalizePhraseTranslation: (input: {
		sentenceId: number
		placeholderPhraseId: string
		phrase: SentencePhrase
	}) => void
	setSelectedPhraseId: (input: { sentenceId: number; phraseId: string | null }) => void
	setPhraseFlashcardId: (input: { sentencePhraseId: number; flashcardId: null | number }) => void
}*/
