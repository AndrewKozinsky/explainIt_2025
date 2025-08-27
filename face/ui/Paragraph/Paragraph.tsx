import cn from 'classnames'
import './Paragraph.scss'

type ParagraphProps = {
	children: React.ReactNode
	fontSize: 14 | 15 | 16 | 18 | 20 | '14' | '15' | '16' | '18' | '20'
	extraClass?: string | string[]
}

/** Компонент абзаца в статье */
function Paragraph(props: ParagraphProps) {
	const { children, fontSize, extraClass } = props

	return <p className={cn('paragraph paragraph--' + fontSize, extraClass)}>{children}</p>
}

export default Paragraph
