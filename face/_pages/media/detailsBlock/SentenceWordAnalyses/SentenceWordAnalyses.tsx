import { useDetailsStore } from '../detailsStore'
import SentenceWordAnalysis from '../SentenceWordAnalysis/SentenceWordAnalysis'
import { useWordAnalyses } from './fn/useWordAnalyses'
import './SentenceWordAnalyses.scss'

type SentenceWordAnalysesProps = {
	languageCode: string
}

function SentenceWordAnalyses(props: SentenceWordAnalysesProps) {
	const { languageCode } = props
	const wordAnalyses = useDetailsStore((s) => s.wordAnalyses)

	useWordAnalyses()

	if (!wordAnalyses.length) return null

	return (
		<div className='sentence-word-analyses'>
			{wordAnalyses.map((analysis, index) => {
				return (
					<div className='sentence-word-analyses__item' key={`${index}-${analysis}`}>
						<SentenceWordAnalysis wordAnalysis={analysis} languageCode={languageCode} onWhiteBackground />
					</div>
				)
			})}
		</div>
	)
}

export default SentenceWordAnalyses
