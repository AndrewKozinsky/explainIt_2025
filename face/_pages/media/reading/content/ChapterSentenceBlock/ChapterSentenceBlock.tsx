import { LanguageCode } from 'utils/utils'
import SentenceBlock from '../../../commonComponents/SentenceBlock/SentenceBlock'
import { ChapterTextStructurePopulated } from '../../readingStore'
import SentenceTools from '../tools/SentenceTools/SentenceTools'
import './ChapterSentenceBlock.scss'

type ChapterSentenceProps = {
	sentence: ChapterTextStructurePopulated.Sentence
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	languageCode: LanguageCode
}

function ChapterSentenceBlock(props: ChapterSentenceProps) {
	const { sentence, selectedSentenceId, selectedWordId, selectWord, languageCode } = props

	return (
		<div>
			<SentenceBlock
				sentenceId={sentence.id}
				sentenceText={sentence.sentence}
				selectedSentenceId={selectedSentenceId}
				selectedWordId={selectedWordId}
				selectWord={selectWord}
			/>
			<SentenceTools sentence={sentence} />
			{/*<SentenceDetails sentenceId={sentence.id} languageCode={languageCode} />*/}
		</div>
	)
}

export default ChapterSentenceBlock
