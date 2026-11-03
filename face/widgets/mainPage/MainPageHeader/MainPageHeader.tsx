import cn from 'classnames'
import './MainPageHeader.scss'

type MainPageHeaderProps = {
	text: string
	extraClass?: string
}

/** Заголовок блока главной страницы. Размер зависит от ширины ближайшего контейнера, поэтому блок должен им быть */
function MainPageHeader(props: MainPageHeaderProps) {
	const { text, extraClass } = props

	return <h2 className={cn('main-page-header', extraClass)}>{text}</h2>
}

export default MainPageHeader
