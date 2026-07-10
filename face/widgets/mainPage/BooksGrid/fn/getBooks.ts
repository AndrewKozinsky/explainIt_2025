import { LanguageCode } from 'utils/languages'
import { createMediaIdUrl, pageUrls } from 'utils/pageUrls'
import { useBookPublicControllerGetBooks } from '@/shared/api/generated/book-public/book-public'
import type { BookPublicOutModel } from '@/shared/api/generated/models'

export type BookData = {
	id: number
	cover: string
	url: string
	author: string
	name: string
	languageCode: LanguageCode
}

export function useGetBooksData(currentLanguage: LanguageCode) {
	const { data, error, isLoading } = useBookPublicControllerGetBooks()

	if (isLoading) {
		return {
			loading: true,
			errorMessage: null,
			data: [],
		}
	} else if (error) {
		return {
			loading: false,
			errorMessage: '',
			data: [],
		}
	} else if (!data) {
		return {
			loading: false,
			errorMessage: null,
			data: [],
		}
	}

	return {
		loading: false,
		errorMessage: null,
		data: (data as unknown as BookPublicOutModel[])
			.filter((book) => {
				return (book.languageCode as LanguageCode) === currentLanguage
			})
			.map((book) => {
				const bookIdInUrl = createMediaIdUrl(book.id, 'public')

				return {
					id: book.id,
					cover: book.covers[0],
					url: pageUrls.books.book(bookIdInUrl).path,
					author: book.author || '',
					name: book.name,
					languageCode: book.languageCode as LanguageCode,
				}
			}) as BookData[],
	}
}
