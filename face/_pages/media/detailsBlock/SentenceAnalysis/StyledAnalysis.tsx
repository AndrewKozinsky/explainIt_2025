import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './StyledAnalysis.scss'

type StyledAnalysisProps = {
	analysis: string
}

function StyledAnalysis(props: StyledAnalysisProps) {
	const { analysis } = props

	return (
		<div className='styled-analysis'>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis}</ReactMarkdown>
		</div>
	)
}

export default StyledAnalysis
