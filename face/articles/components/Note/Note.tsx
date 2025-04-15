import cn from 'classnames'
import ArticleType from '../../articleTypes/articleType'
import ArticleBuilder from '../../ArticleBuilder/ArticleBuilder'
import './Note.scss'

type NoteProps = {
	config: ArticleType.Note
}

/** Серая или оранжевая обёртка для вложенных элементов статьи */
function Note(props: NoteProps) {
	const { config } = props

	const classes = ['art-note', 'art-note--' + (config.noteStyle || 'gray')]

	return (
		<section className={cn(classes)}>
			<ArticleBuilder articleContent={config.children} />
		</section>
	)
}

export default Note
