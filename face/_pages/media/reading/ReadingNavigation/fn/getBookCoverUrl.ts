import type { BookPrivateOutModel, BookPublicOutModel } from '@/shared/api/generated/models'

export function getBookCoverUrl(book: BookPrivateOutModel | BookPublicOutModel): string | null {
	if ('covers' in book && book.covers.length > 0) {
		return book.covers[0]
	}
	if ('coverUrl' in book) {
		return (book.coverUrl as unknown as string) ?? null
	}
	return null
}
