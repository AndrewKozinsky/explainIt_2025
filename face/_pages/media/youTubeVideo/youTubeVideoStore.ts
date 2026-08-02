import { create } from 'zustand'
import type { PlayerCommand } from '@/entites/players/VideoPlayer/fn/types'

type YouTubeVideoStoreValues = {
	player: {
		currentTime: number
		duration: number
		paused: boolean
		command: null | PlayerCommand
	}
}

type YouTubeVideoStoreMethods = {
	setPlayerState: (state: Partial<YouTubeVideoStoreValues['player']>) => void
	sendPlayerCommand: (command: PlayerCommand) => void
}

type VideoStore = YouTubeVideoStoreValues & YouTubeVideoStoreMethods

// ⸻ Defaults ⸻

const defaults: YouTubeVideoStoreValues = {
	player: {
		currentTime: 0,
		duration: 0,
		paused: true,
		command: null,
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
				command,
			},
		}))
	},
}))
