// import React from 'react'
// import type { BookModel } from '@/entities/book/repository/BooksRepository'
// import EditChapterForm from '@/entities/chapter/ui/editChapter/EditChapterForm/EditChapterForm'
// import Divider from '@/shared/ui/Divider/Divider'
// import Button from '@/shared/ui/formRelated/buttons/Button/Button'
// import EditBookForm from '../EditPrivateBookForm/EditPrivateBookForm'

/*type EditPrivateBookAndChaptersProps = {
	book: BookModel
	onBookUpdated: (updatedBook: BookModel) => void
	onCoverUpdated: (updatedBook: BookModel) => void
	onAddChapter: () => void
	onChapterDeleted: (chapterId: number) => void
	onChapterUpdated: () => void
}*/

/*export function EditPrivateBookAndChapters(props: EditPrivateBookAndChaptersProps) {
	const { book, onBookUpdated, onCoverUpdated, onAddChapter, onChapterDeleted, onChapterUpdated } = props

	const chapters = book.chapters

	return (
		<>
			<EditBookForm book={book} onBookUpdated={onBookUpdated} onCoverUpdated={onCoverUpdated} />
			{chapters.map(function (chapter) {
				return (
					<React.Fragment key={chapter.id}>
						<Divider />
						<EditChapterForm
							chapterLite={chapter}
							bookId={book.id}
							onChapterUpdated={onChapterUpdated}
							onChapterDeleted={onChapterDeleted}
						/>
					</React.Fragment>
				)
			})}
			<Button onClick={onAddChapter}>Добавить главу</Button>
		</>
	)
}*/
