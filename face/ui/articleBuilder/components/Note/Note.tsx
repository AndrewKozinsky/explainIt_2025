import { ReactNode } from 'react'
import cn from 'classnames'
import './Note.scss'

type NoteProps = {
	noteStyle?: 'gray' | 'yellow'
	children: ReactNode
}

/** Серая или жёлтая обёртка для вложенных элементов статьи */
function Note(props: NoteProps) {
	const { noteStyle = 'gray', children } = props

	const classes = ['art-note', 'art-note--' + noteStyle]

	return <section className={cn(classes)}>{children}</section>
}

export default Note
