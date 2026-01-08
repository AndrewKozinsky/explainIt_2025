import { VideoPrivateOutModel } from '@/graphql'
import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'
import { produce } from 'immer'
import { create } from 'zustand'

export const watchingStoreValues: WatchingStoreValues = {
	video: null as any as WatchingStoreI.VideoData,
	player: {
		currentTime: 0,
		duration: 0,
		paused: true,
		command: null,
	},
	deviceType: 'mouse',
	mobileCurrentContentType: 'text',
	fullScreen: false,
	populatedPlainText: null as any as PopulatedTextStructure.Structure,
	populatedSubtitles: null as any as PopulatedSubtitlesStructure.Structure,
	isWordsAddingModeEnabled: false,
}

export const useWatchingStore = create<WatchingStore>()((set, get) => {
	return {
		...watchingStoreValues,
		updateStore: (storePart: Partial<WatchingStoreValues>) => {
			set(storePart)
		},
		updateMobileCurrentContentType: (contentType) => {
			set((state) => {
				return {
					mobileCurrentContentType: contentType,
				}
			})
		},
		updateVideo: (video) => {
			set((state) => {
				return {
					video,
				}
			})
		},
		changeDeviceType(deviceType) {
			set((state) => {
				return {
					deviceType,
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
		updateSelectedPlainText(selectedSentenceId: number, selectedWordId: number) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const selectedObj = { ...draftState.populatedPlainText.selected }

					// Если ничего не выделяли или выделили слово другого предложения
					if (!selectedObj.sentenceId || selectedObj.sentenceId !== selectedSentenceId) {
						selectedObj.sentenceId = selectedSentenceId
						selectedObj.wordIds = [selectedWordId]
					}
					// Если выделили слово, принадлежащее выделенному предложению
					else {
						const isAddingMode = baseState.isWordsAddingModeEnabled

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
		},
		updateSelectedSubtitle(selectedSubtitleId: number, selectedWordId: number) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const selectedObj = { ...draftState.populatedSubtitles.selected }

					// Если ничего не выделяли или выделили слово другого предложения
					if (!selectedObj.subtitleId || selectedObj.subtitleId !== selectedSubtitleId) {
						selectedObj.subtitleId = selectedSubtitleId
						selectedObj.wordIds = [selectedWordId]
					}
					// Если выделили слово, принадлежащее выделенному предложению
					else {
						const isAddingMode = baseState.isWordsAddingModeEnabled

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

					draftState.populatedSubtitles.selected = selectedObj
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
}

export type WatchingStore = WatchingStoreValues & WatchingStoreMethods

type DeviceType = 'mouse' | 'touch'

export type WatchingStoreValues = {
	video: WatchingStoreI.VideoData
	player: {
		currentTime: number
		duration: number
		paused: boolean
		command: null | PlayerCommand
	}
	deviceType: DeviceType
	mobileCurrentContentType: WatchingStoreI.MobileCurrentContentType
	fullScreen: boolean
	populatedPlainText: PopulatedTextStructure.Structure
	populatedSubtitles: PopulatedSubtitlesStructure.Structure
	// Если этот режим включен, то при нажатии на слово оно будет добавляться во фразу типа idle.
	// Если выключен, то заменит все слова поставленные во фразу типа idle.
	isWordsAddingModeEnabled: boolean
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
	updateMobileCurrentContentType: (contentType: WatchingStoreI.MobileCurrentContentType) => void
	updateVideo: (book: WatchingStoreI.VideoData) => void
	changeDeviceType: (deviceType: DeviceType) => void
	setPlayerState: (state: Partial<WatchingStoreI.Player>) => void
	sendPlayerCommand: (command: PlayerCommand) => void
	toggleFullScreen: () => void
	changeWordsAddingMode: (isEnabled: boolean) => void
	updateSelectedPlainText: (sentenceId: number, wordId: number) => void
	updateSelectedSubtitle: (subtitleId: number, wordId: number) => void
}
