import type { Book } from '@/entites/books/repository/BooksRepository'
import type { LanguageCode } from '@/shared/utils/languages'
import { pageUrls } from '@/shared/utils/pageUrls'
import { bookConfig } from '_pages/media/commonComponents/bookConfig'
import type {
	MediaItemsGridConfig,
	PrivateItem,
	PublicItem,
} from '_pages/media/commonComponents/mediaItemsGrid/MediaItemsGrid/types'

/**
 * Формирует конфиг для MediaItemsGrid из унифицированных книг.
 * Чистая функция — не зависит от API, сторов или хуков.
 */
export function getContentConfig(books: Book[]): MediaItemsGridConfig {
	const privateBooks = books.filter((book) => book.type === 'private')
	const publicBooks = books.filter((book) => book.type === 'public')

	return {
		privateItems: privateBooks.map(toPrivateItem),
		publicItems: publicBooks.map(toPublicItem),
	}
}

// ─── Приватные мапперы ─────────────────────────────────────────────────────

function toPrivateItem(book: Book): PrivateItem {
	const bookId = String(book.id)
	const chapterId = resolveFirstChapterId(book)

	return {
		name: book.name,
		subName: book.author,
		url: pageUrls.books.book(bookId).chapter(chapterId).reading.path,
		actionUrl: pageUrls.books.book(bookId).path,
		coverUrl: book.coverUrl ?? undefined,
	}
}

function toPublicItem(book: Book): PublicItem {
	const bookId = String(book.id)
	const chapterId = resolveFirstChapterId(book)

	return {
		name: book.name ?? bookConfig.emptyBookName,
		subName: book.author,
		languageCode: (book.languageCode as LanguageCode) ?? 'en',
		coverUrl: book.coverUrl ?? '',
		url: pageUrls.books.book(bookId).chapter(chapterId).reading.path,
		actionUrl: pageUrls.books.book(bookId).path,
	}
}

function resolveFirstChapterId(book: Book): number {
	return book.chapters[0]?.id ?? 0
}
