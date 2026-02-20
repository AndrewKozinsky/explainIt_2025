import { create } from 'zustand'
import { VideoPrivateLiteOutModel, VideoPublicLiteOutModel } from '@/graphql'

export const videosStoreValues: VideosStoreValues = {
	pageUrlType: 'videos',
	mobileCurrentContentType: 'videos',
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
	publicVideo: null,
	privateVideo: null,
}

export const useVideosStore = create<VideosStoreFull>()((set) => {
	return {
		...videosStoreValues,
		updateMobileCurrentContentType: (contentType: VideosStore.MobileCurrentContentType) => {
			set((state) => {
				return {
					mobileCurrentContentType: contentType,
				}
			})
		},
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
	pageUrlType: VideosStore.PageUrlType
	mobileCurrentContentType: VideosStore.MobileCurrentContentType
	publicVideos: VideosStore.PublicVideosData
	privateVideos: VideosStore.PrivateVideosData
	publicVideo: null | VideoPublicLiteOutModel
	privateVideo: null | VideoPrivateLiteOutModel
}

export namespace VideosStore {
	export type PageUrlType = 'videos' | 'video'
	// На телефоне показываются 2 кнопки: Видео и Детали.
	// В зависимости от нажатой кнопки показывается одна из колонок
	export type MobileCurrentContentType = 'videos' | 'video'

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
	updateMobileCurrentContentType: (contentType: VideosStore.MobileCurrentContentType) => void
	updatePublicVideos: (videos: VideosStore.PublicVideosData) => void
	updatePrivateVideos: (videos: VideosStore.PrivateVideosData) => void
}
