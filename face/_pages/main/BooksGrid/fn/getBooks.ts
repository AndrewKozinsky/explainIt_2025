import { useBook_GetBooksPublic } from 'graphql'
import { LanguageCode } from 'utils/utils'
import { getTextByUnknownError } from '@/utils/errorMessages'
import { createMediaIdUrl, pageUrls } from 'сonsts/pageUrls'

export type BookData = {
	id: number
	cover: string
	url: string
	author: string
	name: string
	languageCode: LanguageCode
}

export function useGetBooksData(currentLanguage: LanguageCode) {
	const { data, error, loading } = useBook_GetBooksPublic()

	if (loading) {
		return {
			loading: true,
			errorMessage: null,
			data: [],
		}
	} else if (error) {
		return {
			loading: false,
			errorMessage: getTextByUnknownError(error),
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
		data: data.book_public_get_books
			.filter((book) => {
				return book.languageCode === currentLanguage
			})
			.map((book) => {
				const bookIdInUrl = createMediaIdUrl(book.id, 'public')

				return {
					id: book.id,
					cover: book.covers[0],
					url: pageUrls.books.book(bookIdInUrl).path,
					author: book.author,
					name: book.name,
					languageCode: book.languageCode,
				}
			}) as BookData[],
	}
}
