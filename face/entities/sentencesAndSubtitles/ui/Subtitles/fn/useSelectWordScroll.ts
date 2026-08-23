// import { useCallback, useEffect, useRef } from 'react'
// import type { VideoSubtitlesModel } from '@/entities/video/repository/VideosRepository'

// type SelectWordInput = { sentenceId: number; wordId: number }

/*type UseSelectWordScrollParams = {
	subtitles: VideoSubtitlesModel.Structure['subtitles']
	selectWord: (input: SelectWordInput) => void
	scrollToSubtitle: (subtitleId: number) => void
}*/

/**
 * Оборачивает selectWord: при клике на слово скроллит страницу к субтитру,
 * которому принадлежит это слово.
 *
 * Ключом для скролла служит идентификатор субтитра, а не слова, поэтому
 * повторные клики по другим словам того же субтитра не вызывают скролл.
 * Текущий ли это субтитр — не важно.
 */
/*export function useSelectWordScroll(params: UseSelectWordScrollParams) {
	const { subtitles, selectWord, scrollToSubtitle } = params

	const lastScrolledSubtitleIdRef = useRef<number | null>(null)

	// При смене видео сбрасываем запомненный субтитр.
	useEffect(() => {
		lastScrolledSubtitleIdRef.current = null
	}, [subtitles])

	return useCallback(
		(input: SelectWordInput) => {
			selectWord(input)

			const subtitle = subtitles.find(
				(item): item is VideoSubtitlesModel.Subtitle =>
					item.type === 'subtitle' && item.texts.some((text) => text.sentenceId === input.sentenceId),
			)
			if (!subtitle) return

			if (lastScrolledSubtitleIdRef.current === subtitle.id) return

			lastScrolledSubtitleIdRef.current = subtitle.id
			scrollToSubtitle(subtitle.id)
		},
		[selectWord, subtitles, scrollToSubtitle],
	)
}*/
