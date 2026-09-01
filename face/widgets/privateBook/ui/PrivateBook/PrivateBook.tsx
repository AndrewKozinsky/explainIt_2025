'use client'

import { useCallback, useState } from 'react'
import { booksService } from '@/entities/book/BooksService'
import { getBookChaptersLinksConfig } from '@/entities/book/lib/getBookChaptersLinksConfig'
import type { BookModel } from '@/entities/book/repository/BooksRepository'
import { chaptersService } from '@/entities/chapter/ChaptersService'
import ChaptersList from '@/entities/media/ui/ChaptersList/ChaptersList'
import MediaContentWrapper from '@/entities/media/ui/MediaContentWrapper/MediaContentWrapper'
import { EditPrivateBookAndChapters } from '@/widgets/privateBook/ui/EditPrivateBookAndChapters/EditPrivateBookAndChapters'

type PrivateBookPartProps = {
	book: BookModel
}

export default function PrivateBook(props: PrivateBookPartProps) {
	const { book: initialBook } = props
	const [currentBook, setCurrentBook] = useState<BookModel>(initialBook)

	// Обновление только текстовых полей книги (не трогает обложку)
	const handleBookUpdated = useCallback(function (updatedBook: BookModel) {
		setCurrentBook(function (prev) {
			return {
				...prev,
				author: updatedBook.author,
				name: updatedBook.name,
				languageCode: updatedBook.languageCode,
			}
		})
	}, [])

	// Обновление обложки (замена всей книги)
	const handleCoverUpdated = useCallback(function (updatedBook: BookModel) {
		setCurrentBook(updatedBook)
	}, [])

	const handleAddChapter = useCallback(
		async function () {
			const result = await chaptersService.createChapter({
				bookId: currentBook.id,
				bookType: 'private',
			})

			if (result.error || result.errors || !result.data) return

			const bookResult = await booksService.getBook(currentBook.id)
			if (bookResult.data) {
				setCurrentBook(bookResult.data)
			}
		},
		[currentBook.id],
	)

	const handleChapterDeleted = useCallback(function (chapterId: number) {
		setCurrentBook(function (prev) {
			return {
				...prev,
				chapters: prev.chapters.filter(function (ch) {
					return ch.id !== chapterId
				}),
			}
		})
	}, [])

	const handleChapterUpdated = useCallback(
		async function () {
			const bookResult = await booksService.getBook(currentBook.id)
			if (bookResult.data) {
				setCurrentBook(bookResult.data)
			}
		},
		[currentBook.id],
	)

	if (currentBook.type !== 'private') {
		return null
	}

	const chaptersConfig = getBookChaptersLinksConfig(currentBook)

	return (
		<MediaContentWrapper
			list={
				<div className='private-book__right-menu'>
					<ChaptersList chapters={chaptersConfig} extraClass='private-book__chapters-list' />
				</div>
			}
		>
			<EditPrivateBookAndChapters
				book={currentBook}
				onBookUpdated={handleBookUpdated}
				onCoverUpdated={handleCoverUpdated}
				onAddChapter={handleAddChapter}
				onChapterDeleted={handleChapterDeleted}
				onChapterUpdated={handleChapterUpdated}
			/>
		</MediaContentWrapper>
	)
}
