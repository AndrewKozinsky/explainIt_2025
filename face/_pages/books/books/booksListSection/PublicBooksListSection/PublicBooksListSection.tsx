// import React from 'react'
// import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
// import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
// import Paragraph from 'ui/Paragraph/Paragraph'
// import { SectionWithHeader } from '_pages/bookAndVideoCommon/SectionWithHeader/SectionWithHeader'
// import { useBooksStore } from '_pages/books/books/booksStore'
// import ChaptersSection from '../../chaptersSection/ChaptersSection/ChaptersSection'
// import BookLink from '../BookLink/BookLink'

/*function PublicBooksListSection() {
	return (
		<SectionWithHeader title='Публичные книги'>
			<PublicBooksListContent />
		</SectionWithHeader>
	)
}*/

// export default PublicBooksListSection

/*function PublicBooksListContent() {
	const publicBooks = useBooksStore((state) => state.publicBooks)

	if (publicBooks.loading) {
		return <LoadingMessage text='Загрузка...' />
	} else if (publicBooks.errorMessage) {
		return <ErrorMessage text={publicBooks.errorMessage} />
	} else if (!publicBooks.data.length) {
		return <Paragraph fontSize={16}>Нет ни одной книги</Paragraph>
	}

	return (
		<>
			{publicBooks.data.map((book) => {
				const bookWithType = { ...book, bookType: 'public' as const }

				return (
					<React.Fragment key={book.id}>
						<BookLink bookData={bookWithType} />
						<ChaptersSection bookType='public' bookId={book.id} />
					</React.Fragment>
				)
			})}
		</>
	)
}*/
