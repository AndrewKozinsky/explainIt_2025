// import { useCallback, useContext, useState, useMemo } from 'react'
// import { ChaptersService } from '@/entities/chapter/ChaptersService'
// import { ChaptersApi } from '@/entities/chapter/repository/ChaptersApi'
// import { NotificationContext } from '@/shared/ui/Notification/fn/context'

/*export function useGetDeleteChapter(chapterId: number, onChapterDeleted: () => void) {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const chaptersService = useMemo(() => new ChaptersService(new ChaptersApi()), [])

	const onDeleteChapterClick = useCallback(
		async function () {
			setStatus('loading')

			try {
				const result = await chaptersService.deleteChapter(chapterId)

				if (result.error || result.errors) {
					notify({
						type: 'error',
						message:
							'Не удалось удалить главу. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
					})
					setStatus('idle')
					return
				}

				onChapterDeleted()
			} catch {
				notify({
					type: 'error',
					message:
						'Не удалось удалить главу. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
				setStatus('idle')
			}
		},
		[chapterId, chaptersService, notify, onChapterDeleted],
	)

	return {
		status,
		onDeleteChapterClick,
	}
}*/
