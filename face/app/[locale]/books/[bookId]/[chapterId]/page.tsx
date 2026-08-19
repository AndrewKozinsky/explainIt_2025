import ChapterPage from '_pages/media/chapter/ChapterRoot/ChapterPage'

export default async function Page({ params }: { params: Promise<{ bookId: string; chapterId: string }> }) {
	const { bookId, chapterId } = await params
	return <ChapterPage chapterId={chapterId} bookId={bookId} />
}
