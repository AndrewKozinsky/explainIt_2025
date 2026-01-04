import { useEffect } from 'react'
import { useVideoPrivate_Get, VideoPrivateOutModel } from '@/graphql'
// import { populateChapterStructure } from '_pages/books/commonLogic/populateChapterStructure'
import { useParams } from 'next/navigation'
import { useWatchingStore } from '../../watchingStore'

export function usePopulateWatchingStore() {
	useFetchVideoAndSetToStore()
	// useCreatePopulatedChapterAndSetToStore()
}

function useFetchVideoAndSetToStore() {
	const videoIdStr = useParams().videoId as string
	const videoId = parseInt(videoIdStr)

	const { data, error, loading } = useVideoPrivate_Get({ variables: { input: { id: videoId! } } })

	useEffect(
		function () {
			const video = data?.video_private_get

			if (loading) {
				useWatchingStore.getState().updateVideo({
					loading: true,
					errorMessage: null,
					data: null as any as VideoPrivateOutModel,
				})
			} else if (error) {
				useWatchingStore.getState().updateVideo({
					loading: false,
					errorMessage: error.message,
					data: null as any as VideoPrivateOutModel,
				})
			} else if (!video) {
				useWatchingStore.getState().updateVideo({
					loading: false,
					errorMessage: null,
					data: null as any as VideoPrivateOutModel,
				})
			} else {
				useWatchingStore.getState().updateVideo({
					loading: false,
					errorMessage: null,
					data: video,
				})
			}
		},
		[data, error, loading],
	)
}

/*function useCreatePopulatedChapterAndSetToStore() {
	const chapter = useWatchingStore((s) => s.chapter)

	useEffect(
		function () {
			const chapterData = chapter?.data
			if (!chapterData || !chapterData.content) return

			const chapterStructure = JSON.parse(chapterData.content) as ChapterTextStructure.Chapter
			const populatedChapter = populateChapterStructure({
				id: chapterData.id,
				header: chapterData.header,
				name: chapterData.name,
				content: chapterStructure,
				phrases: chapterData.phrases,
			})

			useWatchingStore.getState().updatePopulatedChapter(populatedChapter)
		},
		[chapter],
	)
}*/
