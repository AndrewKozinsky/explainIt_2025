import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useSelectedSentenceStore } from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'
import { useGetHighlightedMarkdownComponents } from './fn/useGetHighlightedMarkdownComponents'
import { useGetSelectedWord } from './fn/useGetSelectedWord'
import './SentenceAnalysis.scss'

function SentenceAnalysis() {
	const translation = useSelectedSentenceStore((s) => s.translation)
	const analysis = useSelectedSentenceStore((s) => s.analysis)
	const selectedWord = useGetSelectedWord()
	const markdownComponents = useGetHighlightedMarkdownComponents(selectedWord)

	if (!translation && !analysis) return null

	return (
		<div className='sentence-analysis'>
			{selectedWord ? <div className='sentence-analysis__selected-word'>{selectedWord}</div> : null}
			{translation ? <div className='sentence-analysis__translation'>{translation}</div> : null}
			{analysis ? (
				<div className='sentence-analysis__analysis markdown'>
					<ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
						{analysis}
					</ReactMarkdown>
				</div>
			) : null}
		</div>
	)
}

export default SentenceAnalysis
