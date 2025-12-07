import { BookPublicResolver } from 'src/routes/bookPublic/bookPublic.resolver'

export const bookResolversDesc: Record<keyof typeof BookPublicResolver.prototype, string> = {
	getBooks: 'Get public books',
	getBook: 'Get public book',
}
