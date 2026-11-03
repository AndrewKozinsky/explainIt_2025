import cn from 'classnames'
import './MainPageEyebrow.scss'

type MainPageEyebrowProps = {
	text: string
	extraClass?: string
}

/** Короткая надпись над заголовком блока главной страницы */
function MainPageEyebrow(props: MainPageEyebrowProps) {
	const { text, extraClass } = props

	return <p className={cn('main-page-eyebrow', extraClass)}>{text}</p>
}

export default MainPageEyebrow
