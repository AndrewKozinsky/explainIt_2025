import { create } from 'zustand'
import type { VideoSubtitlesModel } from '@/entities/video/lib/types'
import type { PlayerCommand, PlayerCommandEvent } from '@/entities/videoPlayer'
import type { PlaybackMode } from '@/entities/video/ui/videoControls/VideoControls/VideoControls'

type PlayerState = {
	currentTime: number
	duration: number
	paused: boolean
	/** Очередь команд, ожидающих подтверждения от адаптера проигрывателя. */
	commandQueue: PlayerCommandEvent[]
}

type PlaybackState = {
	mode: PlaybackMode
	/** Время автоматической остановки. null — играем без авто-остановки. */
	stopAt: null | number
}

type VideoStoreValues = {
	player: PlayerState
	subtitles: null | VideoSubtitlesModel.Subtitle[]
	playback: PlaybackState
}

type VideoStoreMethods = {
	setPlayerState: (state: Partial<PlayerState>) => void
	sendPlayerCommand: (command: PlayerCommand) => void
	setSubtitles: (subtitles: null | VideoSubtitlesModel.Subtitle[]) => void
	setPlayback: (playback: Partial<PlaybackState>) => void
}

type VideoStore = VideoStoreValues & VideoStoreMethods

// ⸻ Defaults ⸻

const defaults: VideoStoreValues = {
	player: {
		currentTime: 0,
		duration: 0,
		paused: true,
		commandQueue: [],
	},
	subtitles: null,
	playback: {
		mode: 'video',
		stopAt: null,
	},
}

let nextPlayerCommandId = 1

// ⸻ Store ⸻

export const useVideoStore = create<VideoStore>()((set) => ({
	...defaults,
	setPlayerState(playerState) {
		set((state) => ({
			player: {
				...state.player,
				...playerState,
			},
		}))
	},
	sendPlayerCommand(command) {
		set((state) => ({
			player: {
				...state.player,
				commandQueue: [...state.player.commandQueue, { id: nextPlayerCommandId++, value: command }],
			},
		}))
	},
	setSubtitles(subtitles) {
		set({ subtitles })
	},
	setPlayback(playback) {
		set((state) => ({
			playback: {
				...state.playback,
				...playback,
			},
		}))
	},
}))
