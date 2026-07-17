import { SectionWithHeader } from '@/shared/ui/SectionWithHeader/SectionWithHeader'
import MenuAndContentContainer from '_pages/media/commonComponents/MenuAndContentContainer/MenuAndContentContainer'
import { useBookStore } from '../bookStore'
import PublicBookChapters from '../PublicBookChapters/PublicBookChapters'
import PublicBookContentInfo from '../PublicBookContentInfo/PublicBookContentInfo'

export default function PublicBookInfo() {
	const book = useBookStore((s) => s.book)

	if (!book.data || book.data.type !== 'public') {
		return null
	}

	return (
		<MenuAndContentContainer
			leftMenu={
				<SectionWithHeader title='Главы'>
					<PublicBookChapters />
				</SectionWithHeader>
			}
		>
			<PublicBookContentInfo />
		</MenuAndContentContainer>
	)
}
