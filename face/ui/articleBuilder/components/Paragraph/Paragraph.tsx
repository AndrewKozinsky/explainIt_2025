import { ReactNode } from 'react'
import cn from 'classnames'
import './Paragraph.scss'

type ParagraphProps = {
	children: ReactNode
}

function Paragraph(props: ParagraphProps) {
	const { children } = props

	return <p className={cn('art-paragraph')}>{children}</p>
}

export default Paragraph
