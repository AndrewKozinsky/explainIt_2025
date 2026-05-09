import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './StyledMarkdown.scss'

type StyledMarkdownProps = {
	content: string
}

function StyledMarkdown(props: StyledMarkdownProps) {
	const { content } = props

	return (
		<div className='styled-markdown'>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
		</div>
	)
}

export default StyledMarkdown
