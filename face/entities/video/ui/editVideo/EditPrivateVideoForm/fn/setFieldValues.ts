// import { useEffect, useRef } from 'react'
// import type { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
// import { EditPrivateVideoFormData } from './form'
// import type { UseFormReset } from 'react-hook-form'

/*export function useSetFieldValues(
	video: VideoLiteModel,
	originalContent: string | null | undefined,
	reset: UseFormReset<EditPrivateVideoFormData>,
) {
	const populatedVideoIdRef = useRef<number | null>(null)

	useEffect(
		function () {
			// Уже заполнили форму для этого видео — не перезаписываем правки пользователя
			if (populatedVideoIdRef.current === video.id) return

			// originalContent ещё не загружен с сервера — ждём
			if (originalContent === undefined) return

			populatedVideoIdRef.current = video.id

			reset({
				name: video.name ?? '',
				content: originalContent ?? '',
				languageCode: video.languageCode,
			})
		},
		[video, originalContent, reset],
	)
}*/
