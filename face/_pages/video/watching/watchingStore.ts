// import { create } from 'zustand'
// import { VideoPrivateOutModel, VideoPublicOutModel } from '@/graphql'
// import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
// import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'

/*export const watchingStoreValues: WatchingStoreValues = {
	video: {
		loading: true,
		errorMessage: null,
		data: null as any as VideoPrivateOutModel,
		type: 'private',
	},
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
	helpCurrentContentType: 'keyboard',
	fullScreen: false,
	populatedPlainText: null as any as PopulatedTextStructure.Structure,
	populatedSubtitles: null as any as PopulatedSubtitlesStructure.Structure,
}*/

/*export const useWatchingStore = create<WatchingStore>()((set, get) => {
	return {
		...watchingStoreValues,
		updateStore: (storePart: Partial<WatchingStoreValues>) => {
			set(storePart)
		},
		updateMobileCurrentContentType: (mobileCurrentContentType) => {
			set((state) => {
				return {
					mobileCurrentContentType,
				}
			})
		},
		updateHelpCurrentContentType: (helpCurrentContentType) => {
			set((state) => {
				return {
					helpCurrentContentType,
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
		selectWord(input: { sentenceId: number; wordId: number }) {
			set((state) => {
				return {
					selection: {
						sentenceId: input.sentenceId,
						wordIds: [input.wordId],
					},
				}
			})
		},
	}
})*/

/*export namespace WatchingStoreI {
	export type VideoData = {
		loading: boolean
		errorMessage: null | string
		data: VideoPrivateOutModel | VideoPublicOutModel
		type: 'public' | 'private'
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
	export type HelpCurrentContentType = 'keyboard' | 'mouse'

	export type SelectedSentence = {
		sentenceId: null | number
		// Идентификаторы выделенных слов
		wordIds: number[]
	}
}*/

// export type WatchingStore = WatchingStoreValues & WatchingStoreMethods

/*export type WatchingStoreValues = {
	video: WatchingStoreI.VideoData
	player: {
		currentTime: number
		duration: number
		paused: boolean
		command: null | PlayerCommand
	}
	mobileCurrentContentType: WatchingStoreI.MobileCurrentContentType
	helpCurrentContentType: WatchingStoreI.HelpCurrentContentType
	fullScreen: boolean
	populatedPlainText: PopulatedTextStructure.Structure
	populatedSubtitles: PopulatedSubtitlesStructure.Structure
	// Данные выделенного предложения и слов
	selection: WatchingStoreI.SelectedSentence
}*/

/*export type PlayerCommand =
	| { type: 'PLAY' }
	| { type: 'PAUSE' }
	| { type: 'SET_TIME'; time: number }
	| { type: 'REWIND'; seconds: number }
	| { type: 'SET_PLAYBACK_RATE'; rate: number }
	| { type: 'START_FORWARD_HOLD'; rate: number }
	| { type: 'STOP_FORWARD_HOLD' }
	| { type: 'START_REVERSE_SEEK'; rate: number }
	| { type: 'STOP_REVERSE_SEEK' }
	| { type: 'SET_VOLUME'; volume: number }*/

/*export type WatchingStoreMethods = {
	updateStore: (store: Partial<WatchingStoreValues>) => void
	updateMobileCurrentContentType: (contentType: WatchingStoreI.MobileCurrentContentType) => void
	updateHelpCurrentContentType: (contentType: WatchingStoreI.HelpCurrentContentType) => void
	updateVideo: (video: WatchingStoreI.VideoData) => void
	setPlayerState: (state: Partial<WatchingStoreI.Player>) => void
	sendPlayerCommand: (command: PlayerCommand) => void
	toggleFullScreen: () => void
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}*/
