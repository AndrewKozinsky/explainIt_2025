import { produce } from 'immer'
import { useSystemStore } from 'stores/systemStore'
import { create } from 'zustand'
import { VideoPrivateOutModel } from '@/graphql'
import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'

export const watchingStoreValues: WatchingStoreValues = {
	video: null as any as WatchingStoreI.VideoData,
	player: {
		currentTime: 0,
		duration: 0,
		paused: true,
		command: null,
	},
	mobileCurrentContentType: 'text',
	selection: {
		sentenceId: null,
		wordIds: [],
	},
	// helpCurrentContentType: 'keyboard',
	fullScreen: false,
	populatedPlainText: null as any as PopulatedTextStructure.Structure,
	populatedSubtitles: null as any as PopulatedSubtitlesStructure.Structure,
	isWordsAddingModeEnabled: false,
	/*analysis: {
		engText: '',
		analysis: {
			type: 'loading',
		},
	},*/
	// Идентификатор текущей вкладки лексемов
	// lexemTabId: '0',
}

export const useWatchingStore = create<WatchingStore>()((set, get) => {
	return {
		...watchingStoreValues,
		updateStore: (storePart: Partial<WatchingStoreValues>) => {
			set(storePart)
		},
		/*updatePlainTextSentenceTranslation(sentenceId: number, translation: string) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const sentence = draftState.populatedPlainText.sentences.find(
						(thisSentence) => thisSentence.id === sentenceId,
					)
					if (!sentence) return
					sentence.translation = translation

					if (draftState.selectedText.plainText?.sentenceId === sentenceId) {
						draftState.selectedText.plainText.translation = translation
					}
				})
			})
		},*/
		/*updateSubtitlesSentenceTranslation(sentenceId: number, translation: string) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const sentence = draftState.populatedSubtitles.sentences.find(
						(thisSentence) => thisSentence.id === sentenceId,
					)
					if (!sentence) return
					sentence.translation = translation

					if (draftState.selectedText.subtitle?.sentenceId === sentenceId) {
						draftState.selectedText.subtitle.translation = translation
					}
				})
			})
		},*/
		updateMobileCurrentContentType: (mobileCurrentContentType) => {
			set((state) => {
				return {
					mobileCurrentContentType,
				}
			})
		},
		/*updateHelpCurrentContentType: (helpCurrentContentType) => {
			set((state) => {
				return {
					helpCurrentContentType,
				}
			})
		},*/
		updateVideo: (video) => {
			set((state) => {
				return {
					video,
				}
			})
		},
		setPlayerState(playerState) {
			set((state) => {
				return {
					player: {
						...state.player,
						...playerState,
					},
				}
			})
		},
		sendPlayerCommand(command) {
			set((state) => {
				return {
					player: {
						...state.player,
						command,
					},
				}
			})
		},
		toggleFullScreen() {
			set((state) => {
				return {
					fullScreen: !state.fullScreen,
				}
			})
		},
		changeWordsAddingMode(isEnabled: boolean) {
			set((state) => {
				return {
					isWordsAddingModeEnabled: isEnabled,
				}
			})
		},
		/*updateSelectedPlainText(selectedSentenceId: number, selectedWordId: number) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const selectedObj = { ...draftState.populatedPlainText.selected }

					// Если ничего не выделяли или выделили слово другого предложения
					if (selectedObj.sentenceId === null || selectedObj.sentenceId !== selectedSentenceId) {
						selectedObj.sentenceId = selectedSentenceId
						selectedObj.wordIds = [selectedWordId]
					}
					// Если выделили слово, принадлежащее выделенному предложению
					else {
						// Если уже выделили 4 слова, то больше не выделять
						if (selectedObj.wordIds.length >= 4) return

						const isAddingMode = useSystemStore.getState().isCmdKeyPressed

						// Если слово уже выделено, то вернёт число больше -1
						const thisSelectedWordIdx = selectedObj.wordIds.findIndex(
							(thisWordId) => thisWordId === selectedWordId,
						)

						// Если слово выделено
						if (thisSelectedWordIdx > -1) {
							if (isAddingMode) {
								// Убрать идентификатор этого слова из массива выделенных слов
								selectedObj.wordIds.splice(thisSelectedWordIdx, 1)
							} else {
								// Полностью заменить добавленные слова новым
								selectedObj.wordIds = [selectedWordId]
							}
						}
						// Если слово не выделено
						else {
							if (isAddingMode) {
								// Добавить новое слово к существующим
								selectedObj.wordIds.push(selectedWordId)
							} else {
								// Полностью заменить добавленные слова новым
								selectedObj.wordIds = [selectedWordId]
							}
						}
					}

					draftState.populatedPlainText.selected = selectedObj
				})
			})
		},*/
		/*updateSelectedSubtitle(selectedSentenceId: number, selectedWordId: number) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const selectedObj = { ...draftState.populatedSubtitles.selected }

					// Если ничего не выделяли или выделили слово другого предложения
					if (selectedObj.sentenceId === null || selectedObj.sentenceId !== selectedSentenceId) {
						selectedObj.sentenceId = selectedSentenceId
						selectedObj.wordIds = [selectedWordId]
					} else {
						// Если уже выделили 4 слова, то больше не выделять
						if (selectedObj.wordIds.length >= 4) return

						const isAddingMode = useSystemStore.getState().isCmdKeyPressed

						// Если слово уже выделено, то вернёт число больше -1
						const thisSelectedWordIdx = selectedObj.wordIds.findIndex(
							(thisWordId) => thisWordId === selectedWordId,
						)

						// Если слово выделено
						if (thisSelectedWordIdx > -1) {
							if (isAddingMode) {
								// Убрать идентификатор этого слова из массива выделенных слов
								selectedObj.wordIds.splice(thisSelectedWordIdx, 1)
							} else {
								// Полностью заменить добавленные слова новым
								selectedObj.wordIds = [selectedWordId]
							}
						}
						// Если слово не выделено
						else {
							if (isAddingMode) {
								// Добавить новое слово к существующим
								selectedObj.wordIds.push(selectedWordId)
							} else {
								// Полностью заменить добавляемое слово существующими
								selectedObj.wordIds = [selectedWordId]
							}
						}
					}

					draftState.populatedSubtitles.selected = selectedObj
				})
			})
		},*/
		/*updateAnalysis(analysis: WatchingStoreI.Analysis) {
			set((state) => {
				if (analysis.analysis.type !== 'data' || !analysis.analysis.lexemes?.length) {
					return { analysis }
				}

				return { analysis, lexemTabId: analysis.analysis.lexemes[0].pos }
			})
		},*/
		/*updateLexemTabId(tabId: string) {
			set((state) => {
				return { lexemTabId: tabId }
			})
		},*/
		selectWord(input: { sentenceId: number; wordId: number }) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const selectedSentenceId = input.sentenceId
					const selectedWordId = input.wordId

					const selectionObj = { ...draftState.selection }

					// Если ничего не выделяли или выделили слово другого предложения
					if (selectionObj.sentenceId === null || selectionObj.sentenceId !== selectedSentenceId) {
						// То выделить это предложение и единственное слово
						selectionObj.sentenceId = selectedSentenceId
						selectionObj.wordIds = [selectedWordId]
					} else {
						const isAddingMode = useSystemStore.getState().isCmdKeyPressed

						// Если слово уже выделено
						const isThisWordAlreadySelected = selectionObj.wordIds.includes(selectedWordId)

						// Если слово выделено
						if (isThisWordAlreadySelected) {
							if (isAddingMode) {
								// Убрать идентификатор этого слова из массива выделенных слов
								selectionObj.wordIds = selectionObj.wordIds.filter(
									(wordId) => wordId !== selectedWordId,
								)
							} else {
								// Полностью заменить добавленные слова новым
								selectionObj.wordIds = [selectedWordId]
							}
						}
						// Если слово не выделено
						else {
							if (isAddingMode) {
								// Добавить новое слово к существующим
								selectionObj.wordIds.push(selectedWordId)
							} else {
								// Полностью заменить добавляемое слово существующими
								selectionObj.wordIds = [selectedWordId]
							}
						}
					}

					draftState.selection = selectionObj
				})
			})
		},
	}
})

export namespace WatchingStoreI {
	export type VideoData = {
		loading: boolean
		errorMessage: null | string
		data: VideoPrivateOutModel
	}
	export type Player = {
		currentTime: number
		duration: number
		paused: boolean
		command: null | PlayerCommand
	}
	// На телефоне показываются 2 кнопки: Текст и Детали.
	// В зависимости от нажатой кнопки показывается одна из двух колонок
	export type MobileCurrentContentType = 'text' | 'details'
	// Если не выбрано ни одно слово, то показывается справка
	// В зависимости от нажатой кнопки показывается одна из двух колонок
	// export type HelpCurrentContentType = 'keyboard' | 'mouse'

	export type SelectedSentence = {
		sentenceId: null | number
		// Идентификаторы выделенных слов
		wordIds: number[]
	}

	/*export type SelectedText = {
		plainText: null | SelectedPlainText
		subtitle: null | SelectedSubtitle
	}*/

	/*export type SelectedSentencePart =
		| { id: number; type: 'word'; value: string }
		| { id: number; type: 'punctuation'; value: string }
		| { id: number; type: 'space' }*/

	/*export type SelectedPlainText = {
		sentenceId: number
		sentenceText: string
		translation?: null | string
		sentenceParts: SelectedSentencePart[]
		wordIds: number[]
		wordsTexts: string[]
	}*/

	/*export type SelectedSubtitle = {
		subtitleText: string
		sentenceId: number
		sentenceText: string
		translation?: null | string
		sentenceParts: SelectedSentencePart[]
		wordIds: number[]
		wordsTexts: string[]
	}*/

	/*export type Analysis = {
		engText: string
		analysis: AnalysisLoading | AnalysisError | AnalysisData
	}*/

	/*type AnalysisLoading = {
		type: 'loading'
	}*/
	/*type AnalysisError = {
		type: 'error'
		message: string
	}*/
	/*type AnalysisData = {
		type: 'data'
		rusText: string
		transcription?: string
		lexemes?: Lexeme[]
	}*/
	/*type Lexeme = {
		text: string
		pos?: string
		ts?: string
		tr?: LexemeTranslation[]
	}*/
	/*export type LexemeTranslation = {
		text: string
		pos?: string
		gen?: string
		syn?: Array<{ text: string; pos?: string; gen?: string }>
		mean?: Array<{ text: string }>
		ex?: Array<{
			text: string
			tr?: Array<{ text: string }>
		}>
	}*/
}

export type WatchingStore = WatchingStoreValues & WatchingStoreMethods

// type DeviceType = 'mouse' | 'touch'

export type WatchingStoreValues = {
	video: WatchingStoreI.VideoData
	player: {
		currentTime: number
		duration: number
		paused: boolean
		command: null | PlayerCommand
	}
	// deviceType: DeviceType
	mobileCurrentContentType: WatchingStoreI.MobileCurrentContentType
	// helpCurrentContentType: WatchingStoreI.HelpCurrentContentType
	fullScreen: boolean
	populatedPlainText: PopulatedTextStructure.Structure
	populatedSubtitles: PopulatedSubtitlesStructure.Structure
	// Данные выделенного предложения и слов
	selection: WatchingStoreI.SelectedSentence
	// Если этот режим включен, то слова накапливаются при выделении.
	isWordsAddingModeEnabled: boolean
	/*selectedText: {
		plainText: null | WatchingStoreI.SelectedPlainText
		subtitle: null | WatchingStoreI.SelectedSubtitle
	}*/
	// analysis: WatchingStoreI.Analysis
	// lexemTabId: string
}

export type PlayerCommand =
	| { type: 'PLAY' }
	| { type: 'PAUSE' }
	| { type: 'SET_TIME'; time: number }
	| { type: 'REWIND'; seconds: number }
	| { type: 'SET_PLAYBACK_RATE'; rate: number }
	| { type: 'START_FORWARD_HOLD'; rate: number }
	| { type: 'STOP_FORWARD_HOLD' }
	| { type: 'START_REVERSE_SEEK'; rate: number }
	| { type: 'STOP_REVERSE_SEEK' }
	| { type: 'SET_VOLUME'; volume: number }

export type WatchingStoreMethods = {
	updateStore: (store: Partial<WatchingStoreValues>) => void
	// updatePlainTextSentenceTranslation: (sentenceId: number, translation: string) => void
	// updateSubtitlesSentenceTranslation: (sentenceId: number, translation: string) => void
	updateMobileCurrentContentType: (contentType: WatchingStoreI.MobileCurrentContentType) => void
	// updateHelpCurrentContentType: (contentType: WatchingStoreI.HelpCurrentContentType) => void
	updateVideo: (book: WatchingStoreI.VideoData) => void
	setPlayerState: (state: Partial<WatchingStoreI.Player>) => void
	sendPlayerCommand: (command: PlayerCommand) => void
	toggleFullScreen: () => void
	changeWordsAddingMode: (isEnabled: boolean) => void
	// updateSelectedPlainText: (sentenceId: number, wordId: number) => void
	// updateSelectedSubtitle: (sentenceId: number, wordId: number) => void
	// updateSelectedText: (selectedText: WatchingStoreI.SelectedText) => void
	// updateAnalysis: (analysis: WatchingStoreI.Analysis) => void
	// updateLexemTabId: (tabId: string) => void
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}
