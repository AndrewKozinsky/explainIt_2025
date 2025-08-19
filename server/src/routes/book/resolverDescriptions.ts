import { BookResolver } from './book.resolver'

export const bookResolversDesc: Record<keyof typeof BookResolver.prototype, string> = {
	createBook: 'Create book',
	updateBook: 'Update user book',
	getUserBooks: 'Get user books',
}
