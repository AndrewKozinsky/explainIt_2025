import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './StyledMarkdown.scss'

type StyledMarkdownProps = {
	content: string
	/** Дополнительный класс для настройки стилей текста, например выделения жирных слов */
	className?: string
}

function StyledMarkdown(props: StyledMarkdownProps) {
	const { content, className } = props

	return (
		<div className={className ? `styled-markdown ${className}` : 'styled-markdown'}>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
		</div>
	)
}

export default StyledMarkdown
