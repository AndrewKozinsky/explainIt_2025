import { create } from 'zustand'
import type { PlayerCommand } from '@/entities/videoPlayer/VideoPlayer/fn/types'
import type { VideoSubtitlesModel } from '@/entities/video/lib/types'

// Режим воспроизведения. Определяет, что делает пробел/центр-клик и какая
// кнопка подсвечена как активная.
export type PlaybackMode = 'video' | 'shadowing' | 'subAndRevert' | 'sub'

type PlayerState = {
	currentTime: number
	duration: number
	paused: boolean
	/** Очередь команд, которые плеер должен выполнить (передаётся через ref) */
	commandQueue: PlayerCommand[]
}

type PlaybackState = {
	mode: PlaybackMode
	/** Время автоматической остановки. null — играем без авто-остановки. */
	stopAt: null | number
}

type YouTubeVideoStoreValues = {
	player: PlayerState
	subtitles: null | VideoSubtitlesModel.Subtitle[]
	playback: PlaybackState
}

type YouTubeVideoStoreMethods = {
	setPlayerState: (state: Partial<PlayerState>) => void
	sendPlayerCommand: (command: PlayerCommand) => void
	setSubtitles: (subtitles: null | VideoSubtitlesModel.Subtitle[]) => void
	setPlayback: (playback: Partial<PlaybackState>) => void
}

type VideoStore = YouTubeVideoStoreValues & YouTubeVideoStoreMethods

// ⸻ Defaults ⸻

const defaults: YouTubeVideoStoreValues = {
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

// ⸻ Store ⸻

export const useYouTubeVideoStore = create<VideoStore>()((set) => ({
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
				commandQueue: [...state.player.commandQueue, command],
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
