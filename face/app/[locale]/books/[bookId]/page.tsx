import BookPage from '_pages/media/book/BookPage/BookPage'

export default async function Page({ params }: { params: Promise<{ bookId: string; locale: string }> }) {
	const { bookId } = await params

	return <BookPage bookId={bookId} />
}
