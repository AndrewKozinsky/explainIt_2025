// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import { useDetailsStore } from '../detailsStore'
// import { useGetHighlightedMarkdownComponents } from './fn/useGetHighlightedMarkdownComponents'
// import { useGetSelectedWord } from './fn/useGetSelectedWord'
// import './SentenceAnalysis.scss'

/*function SentenceAnalysis() {
	const translation = useDetailsStore((s) => s.sentenceTranslation)
	const analysis = useDetailsStore((s) => s.sentenceAnalysis)
	const selectedWord = useGetSelectedWord()
	const markdownComponents = useGetHighlightedMarkdownComponents(selectedWord)

	if (!translation && !analysis) return null

	return (
		<div className='sentence-analysis'>
			<div className='sentence-analysis__analysis markdown'>
				<ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
					{analysis}
				</ReactMarkdown>
			</div>
		</div>
	)
}*/

// export default SentenceAnalysis
