import { VideoPrivateOutModel } from '@/graphql'
import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'
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
}
