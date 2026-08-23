// import { useCallback, useContext, useState } from 'react'
// import { chaptersService } from '@/entities/chapter/ChaptersService'
// import { NotificationContext } from '@/shared/ui/Notification/fn/context'

/*export function useGetDeleteChapter(chapterId: number, onChapterDeleted: () => void) {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

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
		[chapterId, notify, onChapterDeleted],
	)

	return {
		status,
		onDeleteChapterClick,
	}
}*/
