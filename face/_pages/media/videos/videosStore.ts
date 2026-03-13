import { create } from 'zustand'
import { VideoPrivateLiteOutModel, VideoPublicLiteOutModel } from '@/graphql'

export const videosStoreValues: VideosStoreValues = {
	publicVideos: {
		loading: true,
		errorMessage: null,
		data: null as any as VideoPublicLiteOutModel[],
	},
	privateVideos: {
		loading: true,
		errorMessage: null,
		data: null as any as VideoPrivateLiteOutModel[],
	},
}

export const useVideosStore = create<VideosStoreFull>()((set) => {
	return {
		...videosStoreValues,
		updatePublicVideos: (videos: VideosStore.PublicVideosData) => {
			set((state) => {
				return {
					publicVideos: {
						...videos,
					},
				}
			})
		},
		updatePrivateVideos: (books: VideosStore.PrivateVideosData) => {
			set((state) => {
				return {
					privateVideos: {
						...books,
					},
				}
			})
		},
	}
})

export type VideosStoreFull = VideosStoreValues & VideosStoreMethods

export type VideosStoreValues = {
	publicVideos: VideosStore.PublicVideosData
	privateVideos: VideosStore.PrivateVideosData
}

export namespace VideosStore {
	export type PublicVideosData = {
		loading: boolean
		errorMessage: null | string
		data: VideoPublicLiteOutModel[]
	}

	export type PrivateVideosData = {
		loading: boolean
		errorMessage: null | string
		data: VideoPrivateLiteOutModel[]
	}
}

type VideosStoreMethods = {
	updatePublicVideos: (videos: VideosStore.PublicVideosData) => void
	updatePrivateVideos: (videos: VideosStore.PrivateVideosData) => void
}
