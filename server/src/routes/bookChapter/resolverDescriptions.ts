import { BookChapterResolver } from './bookChapter.resolver'

export const bookChapterResolversDesc: Record<keyof typeof BookChapterResolver.prototype, string> = {
	createBookChapter: 'Create book chapter',
	updateBookChapter: 'Update book chapter',
	deleteBookChapter: 'Delete book chapter',
	getBookChapter: 'Get book chapter',
}
