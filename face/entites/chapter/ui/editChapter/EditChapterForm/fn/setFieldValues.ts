import { useEffect, useRef } from 'react'
import { UseFormReset } from 'react-hook-form'
import { BookChapterLiteModel } from '@/entites/chapter/repository/ChaptersRepository'
import { ChangeChapterFormData } from './form'

export function useSetFieldValues(
	chapterLite: BookChapterLiteModel,
	originalContent: string | null,
	reset: UseFormReset<ChangeChapterFormData>,
) {
	const prevChapterIdRef = useRef<number | undefined>(undefined)

	useEffect(
		function () {
			if (chapterLite.id !== prevChapterIdRef.current) {
				reset({
					name: chapterLite.name ?? '',
					header: chapterLite.header ?? '',
					content: originalContent ?? '',
				})

				prevChapterIdRef.current = chapterLite.id
			}
		},
		[chapterLite, originalContent, reset],
	)
}
