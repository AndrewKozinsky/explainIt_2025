import { ReactNode } from 'react'
import cn from 'classnames'
import './MainPageNote.scss'

type MainPageNoteProps = {
	children: ReactNode
	extraClass?: string
}

/** Вывод в рамке в конце блока главной страницы */
function MainPageNote(props: MainPageNoteProps) {
	const { children, extraClass } = props

	return <p className={cn('main-page-note', extraClass)}>{children}</p>
}

export default MainPageNote
