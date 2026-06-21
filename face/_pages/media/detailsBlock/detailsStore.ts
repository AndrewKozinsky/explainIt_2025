import { produce } from 'immer'
import { create } from 'zustand'

export const detailsStoreValues: DetailsStoreValues = {
	chapterId: null,
	bookName: null,
	bookAuthor: null,
	videoId: null,
	videoName: null,
	videoYear: null,
	languageCode: null,
	currentSentenceId: null,
	currentSentenceText: null,
	currentWordId: null,
	currentInfoView: 'dictionary',
	sentences: [],
	retryFetchSentenceTranslationQueue: [],
	retryFetchPhraseQueue: [],
}

export const useDetailsStore = create<DetailsStoreNext>()((set, get) => {
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
						sentenceText: input.text,
						selectedPhraseId: null,
						data: {
							translation: {
								text: '',
								loading: true,
								error: null,
								translation: null,
								visible: true,
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

					Object.assign(entry.data.translation, input.patch)
				}),
			)
		},
		upsertPhraseTranslation: (input: { sentenceId: number; phrase: SentencePhraseType }) => {
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
		patchPhraseTranslation: (input: {
			sentenceId: number
			phraseId: string
			patch: Partial<SentencePhraseType>
		}) => {
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
			phrase: SentencePhraseType
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
		setActiveInfoView: (view: InfoViewType) => {
			set({ currentInfoView: view })
		},
		retrySentenceTranslation: (sentenceId: number) => {
			set(
				produce((state: DetailsStoreNext) => {
					const idx = state.sentences.findIndex((item) => item.sentenceId === sentenceId)
					if (idx < 0) return

					const entry = state.sentences[idx]
					state.sentences.splice(idx, 1)
					state.retryFetchSentenceTranslationQueue.push({
						sentenceId: entry.sentenceId,
						sentenceText: entry.sentenceText,
					})
				}),
			)
		},
		retryPhraseTranslation: (sentenceId: number, randomGeneratedPhraseId: string) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === sentenceId)
					if (!entry) return

					const phrase = entry.data.phrases.find((p) => p.randomGeneratedPhraseId === randomGeneratedPhraseId)
					if (!phrase) return

					phrase.loading = true
					phrase.error = null
					phrase.translation = null

					state.retryFetchPhraseQueue.push({
						sentenceId,
						randomGeneratedPhraseId,
						wordIds: phrase.wordIds,
						sentenceText: entry.sentenceText,
					})
				}),
			)
		},
	}
})

export function makePhraseId(): string {
	return 'p_' + Math.random().toString(36).slice(2) + '_' + Date.now().toString(36)
}

function sameWordIds(a: number[], b: number[]): boolean {
	if (a.length !== b.length) return false

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false
	}

	return true
}

export type DetailsStoreNext = DetailsStoreValues & DetailsStoreMethods

export type DetailsSentenceEntry = {
	sentenceId: number
	sentenceText: string
	selectedPhraseId: string | null
	data: {
		translation: SentenceTranslation
		phrases: SentencePhraseType[]
	}
}

export type SentenceTranslation = {
	text: string
	loading: boolean
	error: null | string
	translation: null | string
	visible: boolean
}

export type SentencePhraseType = {
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
}

export type PhraseExample = {
	text: string
	translate: string
}

export type RetryFetchSentenceTranslationQueueItem = {
	sentenceId: number
	sentenceText: string
}

export type RetryFetchPhraseQueueItem = {
	sentenceId: number
	randomGeneratedPhraseId: string
	wordIds: number[]
	sentenceText: string
}

export type InfoViewType = 'words' | 'ai_dialog' | 'dictionary'

export type DetailsStoreValues = {
	chapterId: null | number
	bookName: null | string
	bookAuthor: null | string
	videoId: null | number
	videoName: null | string
	videoYear: null | string | number
	languageCode: null | string
	currentSentenceId: null | number
	currentSentenceText: null | string
	currentWordId: null | number
	currentInfoView: InfoViewType
	sentences: DetailsSentenceEntry[]
	retryFetchSentenceTranslationQueue: RetryFetchSentenceTranslationQueueItem[]
	retryFetchPhraseQueue: RetryFetchPhraseQueueItem[]
}

export type DetailsStoreMethods = {
	clearStoreData: () => void
	updateStore: (store: Partial<DetailsStoreValues>) => void
	insertLoadingSentence: (input: { sentenceId: number; text: string }) => void
	patchSentenceTranslation: (input: { sentenceId: number; patch: Partial<SentenceTranslation> }) => void
	upsertPhraseTranslation: (input: { sentenceId: number; phrase: SentencePhraseType }) => void
	patchPhraseTranslation: (input: {
		sentenceId: number
		phraseId: string
		patch: Partial<SentencePhraseType>
	}) => void
	finalizePhraseTranslation: (input: {
		sentenceId: number
		placeholderPhraseId: string
		phrase: SentencePhraseType
	}) => void
	setSelectedPhraseId: (input: { sentenceId: number; phraseId: string | null }) => void
	setPhraseFlashcardId: (input: { sentencePhraseId: number; flashcardId: null | number }) => void
	setActiveInfoView: (view: InfoViewType) => void
	retrySentenceTranslation: (sentenceId: number) => void
	retryPhraseTranslation: (sentenceId: number, randomGeneratedPhraseId: string) => void
}
