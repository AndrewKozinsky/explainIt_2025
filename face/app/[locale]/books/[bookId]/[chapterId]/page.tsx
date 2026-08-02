import ChapterRoot from '_pages/media/chapter/ChapterRoot/ChapterRoot'

export default async function Page({ params }: { params: Promise<{ bookId: string; chapterId: string }> }) {
	const { bookId, chapterId } = await params
	return <ChapterRoot chapterId={chapterId} bookId={bookId} />
}
