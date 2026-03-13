import { create } from 'zustand'
import { VideoPublicOutModel, VideoPrivateOutModel } from '@/graphql'

export const videoStoreValues: VideoStoreValues = {
	publicVideo: {
		loading: true,
		errorMessage: null,
		data: null as any as VideoPublicOutModel,
	},
	privateVideo: {
		loading: true,
		errorMessage: null,
		data: null as any as VideoPrivateOutModel,
	},
}

export const useVideoStore = create<ReadingStore>()((set) => {
	return {
		...videoStoreValues,
		updatePublicVideo: (video: VideoStore.PublicVideoData) => {
			set((state) => {
				return {
					publicVideo: {
						...video,
					},
				}
			})
		},
		updatePrivateVideo: (video: VideoStore.PrivateVideoData) => {
			set((state) => {
				return {
					privateVideo: {
						...video,
					},
				}
			})
		},
		clearStore: () => {
			set((state) => {
				return videoStoreValues
			})
		},
	}
})

export type ReadingStore = VideoStoreValues & VideoStoreMethods

export type VideoStoreValues = {
	publicVideo: VideoStore.PublicVideoData
	privateVideo: VideoStore.PrivateVideoData
}

export namespace VideoStore {
	export type PrivateVideoData = {
		loading: boolean
		errorMessage: null | string
		data: VideoPrivateOutModel
	}
	export type PublicVideoData = {
		loading: boolean
		errorMessage: null | string
		data: VideoPublicOutModel
	}
}

type VideoStoreMethods = {
	updatePublicVideo: (video: VideoStore.PublicVideoData) => void
	updatePrivateVideo: (video: VideoStore.PrivateVideoData) => void
	clearStore: () => void
}
