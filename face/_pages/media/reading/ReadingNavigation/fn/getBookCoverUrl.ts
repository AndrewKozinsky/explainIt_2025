import { BookPrivateOutModel, BookPublicOutModel } from 'graphql'

export function getBookCoverUrl(book: BookPrivateOutModel | BookPublicOutModel): string | null {
	if ('covers' in book && book.covers.length > 0) {
		return book.covers[0]
	}
	if ('coverUrl' in book) {
		return book.coverUrl ?? null
	}
	return null
}
