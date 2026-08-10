// import { create } from 'zustand'
// import { PlayerCommand } from '@/entities/players/VideoPlayer/fn/types'

/*export type VideoStoreValues = {
	player: {
		currentTime: number
		duration: number
		paused: boolean
		command: null | PlayerCommand
	}
}*/

/*export type VideoStoreMethods = {
	// clearStoreData: () => void
	setPlayerState: (state: Partial<VideoStoreValues['player']>) => void
	sendPlayerCommand: (command: PlayerCommand) => void
}*/

// export type VideoStore = VideoStoreValues & VideoStoreMethods

/*const videoStoreValues: VideoStoreValues = {
	player: {
		currentTime: 0,
		duration: 0,
		paused: true,
		command: null,
	},
}*/

/*export const useVideoStore = create<VideoStore>()((set) => {
	return {
		...videoStoreValues,
		/!*clearStoreData: () => {
			set(videoStoreValues)
		},*!/
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
	}
})*/
