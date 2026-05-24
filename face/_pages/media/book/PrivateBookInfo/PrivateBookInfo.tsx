import { SectionWithHeader } from '@/ui/SectionWithHeader/SectionWithHeader'
import { createMediaIdUrl } from '@/сonsts/pageUrls'
import AddChapterButton from '_pages/media/commonComponents/AddChapterButton/AddChapterButton'
import MenuAndContentContainer from '_pages/media/commonComponents/MenuAndContentContainer/MenuAndContentContainer'
import { useBookStore } from '../bookStore'
import EditBookForm from '../editPrivateBook/EditPrivateBookForm/EditPrivateBookForm'
import PrivateBookChapters from '../PrivateBookChapters/PrivateBookChapters'
import './PrivateBookInfo.scss'

export default function PrivateBookInfo() {
	const privateBook = useBookStore((s) => s.privateBook)

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
			<EditBookForm />
		</MenuAndContentContainer>
	)
}
