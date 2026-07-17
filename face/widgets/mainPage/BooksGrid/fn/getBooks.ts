import { useBookControllerGetBooks } from '@/shared/api/generated/book/book'
import type { BookOutModel } from '@/shared/api/generated/models'
import { LanguageCode } from '@/shared/utils/languages'
import { pageUrls } from '@/shared/utils/pageUrls'

export type BookData = {
	id: number
	cover: string
	url: string
	author: string
	name: string
	languageCode: LanguageCode
}

export function useGetBooksData(currentLanguage: LanguageCode) {
	const { data, error, isLoading } = useBookControllerGetBooks()

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

	const books = (data as unknown as { data: BookOutModel[] }).data

	return {
		loading: false,
		errorMessage: null,
		data: books
			.filter((book) => {
				return book.type === 'public' && (book.languageCode as unknown as LanguageCode) === currentLanguage
			})
			.map((book) => {
				return {
					id: book.id,
					cover: book.coverUrl as unknown as string,
					url: pageUrls.books.book(book.id).path,
					author: (book.author as unknown as string) || '',
					name: book.name as unknown as string,
					languageCode: book.languageCode as unknown as LanguageCode,
				}
			}) as BookData[],
	}
}
