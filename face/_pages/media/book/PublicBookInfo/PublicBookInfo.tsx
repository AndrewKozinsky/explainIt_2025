import { SectionWithHeader } from 'ui/SectionWithHeader/SectionWithHeader'
import MenuAndContentContainer from '_pages/media/commonComponents/MenuAndContentContainer/MenuAndContentContainer'
import { useBookStore } from '../bookStore'
import PublicBookChapters from '../PublicBookChapters/PublicBookChapters'
import PublicBookContentInfo from '../PublicBookContentInfo/PublicBookContentInfo'

export default function PublicBookInfo() {
	const publicBook = useBookStore((s) => s.publicBook)

	if (!publicBook.data) {
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
