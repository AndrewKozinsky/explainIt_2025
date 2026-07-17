// import { useCallback } from 'react'
// import { useQueryClient } from '@tanstack/react-query'
// import { useBookChapterControllerUpdateBookChapter } from '@/shared/api/generated/book-chapter/book-chapter'
// import { getBookChapterControllerGetBookChapterQueryKey } from '@/shared/api/generated/book-chapter/book-chapter'
// import { getBookControllerGetBooksQueryKey } from '@/shared/api/generated/book/book'
// import { getBookControllerGetBookQueryKey } from '@/shared/api/generated/book/book'
// import { FormStatus, setErrorsToForm } from '@/utils/forms'
// import { useChapterStore } from '_pages/media/chapter/chapterStore'
// import { ChangeChapterFormData } from './form'

/*export function useGetOnUpdateChapterFormSubmit(
	setFieldError: (field: keyof ChangeChapterFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const chapter = useChapterStore((s) => s.chapter)

	const { mutateAsync: updateChapter } = useBookChapterControllerUpdateBookChapter()
	const queryClient = useQueryClient()

	return useCallback(
		async function (formData: ChangeChapterFormData) {
			if (!chapter.data) return

			setFormError(null)
			setFormStatus('submitting')

			const bookId = (chapter.data.book as unknown as { id: number }).id

			try {
				await updateChapter({
					id: chapter.data.id,
					data: {
						name: formData.name as any,
						header: formData.header as any,
						originalContent: (formData.content ?? null) as any,
						note: formData.note as any,
					},
				})

				queryClient.invalidateQueries({ queryKey: getBookControllerGetBooksQueryKey() })
				queryClient.invalidateQueries({ queryKey: getBookControllerGetBookQueryKey(bookId) })
				queryClient.invalidateQueries({
					queryKey: getBookChapterControllerGetBookChapterQueryKey(chapter.data.id, { bookType: 'private' }),
				})

				setFormStatus('idle')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}
		},
		[chapter.data, setFieldError, setFormError, setFormStatus, updateChapter, queryClient],
	)
}*/
