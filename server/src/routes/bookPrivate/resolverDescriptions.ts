import { BookResolver } from './book.resolver'

export const bookResolversDesc: Record<keyof typeof BookResolver.prototype, string> = {
	createBookPrivate: 'Create book',
	updateBook: 'Update user book',
	deleteBook: 'Delete user book',
	getBook: 'Get user book',
	getUserBooks: 'Get user books',
}
