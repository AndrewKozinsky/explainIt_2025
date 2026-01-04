import { VideoPrivateOutModel } from '@/graphql'
import { create } from 'zustand'

export const watchingStoreValues: WatchingStoreValues = {
	video: null as any as WatchingStore.VideoData,
	player: {
		currentTime: 0,
		duration: 0,
		paused: true,
		command: null,
	},
	deviceType: 'mouse',
}

export const useWatchingStore = create<WatchingStoreNext>()((set, get) => {
	return {
		...watchingStoreValues,
		updateVideo: (video: WatchingStore.VideoData) => {
			set((state) => {
				return {
					video,
				}
			})
		},
		changeDeviceType(deviceType: DeviceType) {
			set((state) => {
				return {
					deviceType,
				}
			})
		},
		setPlayerState(playerState: Partial<WatchingStore.Player>) {
			set((state) => {
				return {
					player: {
						...state.player,
						...playerState,
					},
				}
			})
		},
		sendPlayerCommand(command: PlayerCommand) {
			set((state) => {
				return {
					player: {
						...state.player,
						command,
					},
				}
			})
		},
	}
})

export namespace WatchingStore {
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
}

export type WatchingStoreNext = WatchingStoreValues & WatchingStoreMethods

type DeviceType = 'mouse' | 'touch'

export type WatchingStoreValues = {
	video: WatchingStore.VideoData
	player: {
		currentTime: number
		duration: number
		paused: boolean
		command: null | PlayerCommand
	}
	deviceType: DeviceType
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
	updateVideo: (book: WatchingStore.VideoData) => void
	changeDeviceType: (deviceType: DeviceType) => void
	setPlayerState: (state: Partial<WatchingStore.Player>) => void
	sendPlayerCommand: (command: PlayerCommand) => void
}
