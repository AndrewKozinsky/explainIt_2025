import { bookConfig } from '@/entities/book/lib/bookConfig'
import { BookModel } from '@/entities/book/repository/BooksRepository'
import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import MediaCardWrapper from '@/entities/mediaCard/MediaCardWrapper/MediaCardWrapper'
import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import { getBookCardsConfig } from './fn/getBookCardsConfig'
import { useLanguageChange } from './fn/useLanguageChange'
import './PublicBooksList.scss'

type PublicBooksList = {
	books: BookModel[]
}

function PublicBooksList(props: PublicBooksList) {
	const { books } = props

	const languages = books.map((item) => item.languageCode)
	const languagesSet = new Set(languages)
	const { currentLang, onLanguageChange } = useLanguageChange(languages)

	const bookCardsConfig = getBookCardsConfig(books, currentLang)

	return (
		<div className='public-books-list'>
			<LanguageSwitch
				languages={Array.from(languagesSet)}
				currentLang={currentLang}
				onChange={onLanguageChange}
			/>
			<ItemsGrid>
				{bookCardsConfig.map((book) => {
					return (
						<MediaCardWrapper type='info' key={book.id} actionUrl={book.actionUrl}>
							<MediaCardButton
								title={book.name}
								subTitle={book.subName}
								url={book.url}
								coverUrl={book.coverUrl}
								defaultMediaName={bookConfig.emptyBookName}
							/>
						</MediaCardWrapper>
					)
				})}
			</ItemsGrid>
		</div>
	)
}

export default PublicBooksList
