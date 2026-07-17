import { SectionWithHeader } from '@/shared/ui/SectionWithHeader/SectionWithHeader'
import AddChapterButton from '_pages/media/commonComponents/AddChapterButton/AddChapterButton'
import MenuAndContentContainer from '_pages/media/commonComponents/MenuAndContentContainer/MenuAndContentContainer'
import { useBookStore } from '../bookStore'
import EditBookForm from '../editPrivateBook/EditPrivateBookForm/EditPrivateBookForm'
import PrivateBookChapters from '../PrivateBookChapters/PrivateBookChapters'

export default function PrivateBookInfo() {
	const book = useBookStore((s) => s.book)

	if (!book.data || book.data.type !== 'private') {
		return null
	}

	const bookId = book.data.id

	return (
		<MenuAndContentContainer
			leftMenu={
				<SectionWithHeader title='Главы'>
					<PrivateBookChapters />
					<AddChapterButton bookId={bookId} bookIdInUrl={String(bookId)} />
				</SectionWithHeader>
			}
		>
			<EditBookForm />
		</MenuAndContentContainer>
	)
}
