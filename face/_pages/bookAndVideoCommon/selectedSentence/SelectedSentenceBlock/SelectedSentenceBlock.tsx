// import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
// import { useAutoTranslateSentence } from '_pages/bookAndVideoCommon/selectedSentence/DetailsSentence/fn/useAutoTranslateSentence'
// import { SelectedSentence } from '_pages/bookAndVideoCommon/selectedSentence/SelectedSentence/SelectedSentence'
// import SentenceAnalysis from '_pages/bookAndVideoCommon/selectedSentence/SentenceAnalysis/SentenceAnalysis'
// import { useSelectedSentenceStore } from '../selectedSentenceStore'
// import { usePopulateStore } from './fn/populateStore'
// import { useSyncSentenceTranslations } from './fn/useSyncSentenceTranslations'
// import './SelectedSentenceBlock.scss'

/*function SelectedSentenceBlock() {
	usePopulateStore()
	useSyncSentenceTranslations()
	const { errorText } = useAutoTranslateSentence()

	const sentenceId = useSelectedSentenceStore((s) => s.sentenceId)
	const wordIds = useSelectedSentenceStore((s) => s.wordIds)

	if (!sentenceId || !wordIds.length) return null

	return (
		<div className='details-side'>
			<SelectedSentence />
			<SentenceAnalysis />
			<ErrorMessage text={errorText ?? ''} />
		</div>
	)
}*/

// export default SelectedSentenceBlock
