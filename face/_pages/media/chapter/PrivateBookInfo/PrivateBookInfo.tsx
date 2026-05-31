import { SectionWithHeader } from '@/ui/SectionWithHeader/SectionWithHeader'
import { useChapterStore } from '_pages/media/chapter/chapterStore'
import EditChapterForm from '_pages/media/chapter/editChapter/EditChapterForm/EditChapterForm'
import AddChapterButton from '_pages/media/commonComponents/AddChapterButton/AddChapterButton'
import MenuAndContentContainer from '_pages/media/commonComponents/MenuAndContentContainer/MenuAndContentContainer'
import PrivateBookChapters from '../PrivateBookChapters/PrivateBookChapters'
import { createMediaIdUrl } from 'сonsts/pageUrls'

export default function PrivateChapterInfo() {
	const privateBook = useChapterStore((s) => s.privateBook)

	if (!privateBook.data) {
		return null
	}

	const bookId = privateBook.data.id
	const bookIdInUrl = createMediaIdUrl(bookId, 'private')

	return (
		<MenuAndContentContainer
			leftMenu={
				<SectionWithHeader title='Главы'>
					<PrivateBookChapters />
					<AddChapterButton bookId={bookId} bookIdInUrl={bookIdInUrl} />
				</SectionWithHeader>
			}
		>
			<EditChapterForm />
		</MenuAndContentContainer>
	)
}
