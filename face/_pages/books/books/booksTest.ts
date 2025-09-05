export const BooksTest = {
	booksRoot: {
		booksSection: 'booksRoot__BooksSection',
		bookSection: 'booksRoot__BookSection',
		editSection: 'booksRoot__EditSection',
	},
	booksList: {
		bookLinkItem(id: string | number) {
			return 'booksListItem_bookLink_' + id
		},
		addBookButton: 'booksList_addBookButton',
	},
}
