import { VideoPrivateOutModel } from '@/graphql'
import { create } from 'zustand'

export const videosStoreValues: VideosStoreValues = {
	pageUrlType: 'videos',
	mobileCurrentContentType: 'videos',
	privateVideos: {
		loading: true,
		errorMessage: null,
		data: null as any as VideoPrivateOutModel[],
	},
	privateVideo: null,
}

export const useVideosStore = create<VideosStoreFull>()((set) => {
	return {
		...videosStoreValues,
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
	privateVideos: VideosStore.PrivateVideosData
	privateVideo: null | VideoPrivateOutModel
}

export namespace VideosStore {
	export type PageUrlType = 'videos' | 'video'
	// На телефоне показываются 3 кнопки: Книги, Главы и Детали.
	// В зависимости от нажатой кнопки показывается одна из трёх колонок
	export type MobileCurrentContentType = 'videos' | 'video'

	export type PrivateVideosData = {
		loading: boolean
		errorMessage: null | string
		data: VideoPrivateOutModel[]
	}
}

type VideosStoreMethods = {
	updatePrivateVideos: (videos: VideosStore.PrivateVideosData) => void
}
