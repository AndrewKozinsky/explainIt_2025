import { BookResolver } from './book.resolver'

export const bookResolversDesc: Record<keyof typeof BookResolver.prototype, string> = {
	create: 'Create book',
}
